import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.config.js";
import { redis } from "../config/redis.config.js";
import User from "../models/user.model.js";
import { sendOTPEmail } from "../utils/mail.utils.js";
import streamifier from "streamifier";


dotenv.config();

export const generateToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return { refreshToken, accessToken };
};

export const storeRefreshToken = async (userId, refreshToken) => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
      console.log("Redis auto-connected");
    }

    await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7);
  } catch (err) {
    console.error("Redis store token error:", err);
  }
};

export const setCookie = (res, refreshToken, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    // ✅ 2. verify OTP and save user
    const {email,username,firstName,role,lastName,password,year,branch, otp} = req.body;
    if (!email ||!username ||!firstName ||!lastName ||!password ||!year ||!branch ||!role || !otp) {
      return res.status(400).json({ message: "All fields including OTP are required" });
    }

    // Verify OTP from Redis
    const storedOTP = await redis.get(`otp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const existed = await User.findOne({ $or: [{ email }, { username }] });
    if (existed) {
      return res.status(400).json({ message: "User or Email already exists" });
    }

    const salted = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salted);

    const user = new User({username,email,firstName,lastName,role,year,branch,password: hashedPassword});
    await user.save();

    // Remove OTP after successful signup
    await redis.del(`otp:${email}`);

    //Authentication
    const { refreshToken, accessToken } = generateToken(user);
    await storeRefreshToken(user._id, refreshToken);
    setCookie(res, refreshToken, accessToken);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        year: user.year,
        role: user.role,
        branch: user.branch,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ 1. otp generation (Signup Request)
export const generateOTP = async (req, res) => {
  try {
    const { email, username } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in Redis with 5 minute expiration
    await redis.set(`otp:${email}`, otp, "EX", 300);

    // Send OTP via email
    try {
      await sendOTPEmail(email, otp);
    } catch (mailError) {
      console.error("Email delivery failed:", mailError.message);
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please ensure your email credentials are correct.",
        error: mailError.message 
      });
    }

    console.log(`Signup OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "OTP generated and sent to email" });

  } catch (error) {
    console.log("Error in generateOTP controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ 2. Generate OTP for Login (Passwordless)
export const generateLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store Login OTP in Redis with distinct key
    await redis.set(`loginOtp:${email}`, otp, "EX", 300);

    // Send OTP via email
    await sendOTPEmail(email, otp);

    console.log(`Login OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "Login OTP sent to email" });

  } catch (error) {
    console.log("Error in generateLoginOTP controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ 3. Login with OTP (Passwordless Verification)
export const loginWithOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const storedOTP = await redis.get(`loginOtp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove OTP after successful login
    await redis.del(`loginOtp:${email}`);

    // Generate tokens
    const { refreshToken, accessToken } = generateToken(user);
    await storeRefreshToken(user._id, refreshToken);
    setCookie(res, refreshToken, accessToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        year: user.year,
        role: user.role,
        branch: user.branch,
      },
    });
  } catch (error) {
    console.log("Error in loginWithOTP controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//otp verification
export const verifyOTP = async (req,res) => {
  try {
      const {otp,email} = req.body;
      if(!otp || !email){
        return res.status(400).json({message:"Email and OTP are required"});
      }
      //  if (!redis.isOpen) {
      //   await redis.connect();
      //   console.log("Redis auto-connected");
      // }
      const storedOTP = await redis.get(`otp:${email}`);
      if(storedOTP !== otp){
        return res.status(400).json({message:"Invalid OTP"});
      }

      await redis.del(`otp:${email}`);
      res.status(200).json({message:"OTP verified successfully"});

  } catch (error) {
    console.log("Error in verifyOTP controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


//done ✅
export const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    //ensures that atleast one identifier is given
    if (!email && !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const { refreshToken, accessToken } = generateToken(user);
    await storeRefreshToken(user._id, refreshToken);
    setCookie(res, refreshToken, accessToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        year: user.year,
        role: user.role,
        branch: user.branch,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//done ✅
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded.id}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateProfile = async (req, res) => {
  try {
    let profilePic = req.body?.profilePic;
    let uploadResponse;

    if (req.file) {
      // Handle Multipart File Upload
      uploadResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "eduSync/profile_pics",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    } else if (profilePic) {
      // Handle Base64/JSON Upload
      uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "eduSync/profile_pics",
        resource_type: "auto",
      });
    } else {
      return res.status(400).json({ message: "Profile pic is required (either as a file or Base64 string)" });
    }

    if (!uploadResponse || !uploadResponse.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ 
      message: "Internal server error during profile update",
      error: error.message 
    });
  }
};

export const profile = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Profile fetched successfully", user: req.user });
  } catch (error) {
    console.log("Error in profile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

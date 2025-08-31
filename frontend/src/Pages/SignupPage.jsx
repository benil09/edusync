import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  Loader,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    year: "",
    branch: "",
    username: "",
  });
  const validate = () => {
    if (!formData.firstName.trim())
      return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("password is required");
    if (formData.password.length < 6)
      return toast.error("password must be atleast 6 character");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");


    return true;
  };

  const { signup, loading } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();
    const success = validate();
    if (success === true) {
      await signup(
        formData.email,
        formData.username,
        formData.firstName,
        formData.lastName,
        formData.password,
        formData.confirmPassword,
        formData.year,
        formData.branch,
        formData.role
      );
    }
    setFormData("");
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle function for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2  flex items-center justify-center p-6 bg-gray-50"
      >
        <div className="w-full max-w-md space-y-6">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-center text-gray-800"
          >
            Signup to edu<span className="text-orange-500">Connect</span>
          </motion.h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center bg-gray-200 rounded-xl">
                <User className="ml-3 text-gray-500" size={20} />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                  required
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex items-center bg-gray-200 rounded-xl">
                <User className="ml-3 text-gray-500" size={20} />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  required
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="flex items-center bg-gray-200 rounded-xl">
              <Mail className="ml-3 text-gray-500" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center bg-gray-200 rounded-xl">
              <Lock className="ml-3 text-gray-500" size={20} />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="mr-3 text-gray-500 cursor-pointer"
              >
                {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div className="flex items-center bg-gray-200 rounded-xl">
              <Lock className="ml-3 text-gray-500" size={20} />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="mr-3 text-gray-500 cursor-pointer"
              >
                {confirmPasswordVisible ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>

            <div className="flex items-center bg-gray-200 rounded-xl">
              <User className="ml-3 text-gray-500" size={20} />
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Username"
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex items-center bg-gray-200 rounded-xl">
              <GraduationCap className="ml-3 text-gray-500" size={20} />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0 appearance-none"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="student">student</option>
                <option value="faculty">faculty</option>
              </select>
              <ChevronDown className="mr-3 text-gray-500" size={20} />
            </div>

            <div className="flex items-center bg-gray-200 rounded-xl">
              <Calendar className="ml-3 text-gray-500" size={20} />
              <select
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0 appearance-none"
              >
                <option value="" disabled hidden>
                  Select Year
                </option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              <ChevronDown className="mr-3 text-gray-500" size={20} />
            </div>

            <div className="flex items-center bg-gray-200 rounded-xl">
              <BookOpen className="ml-3 text-gray-500" size={20} />
              <select
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
                required
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-0 appearance-none"
              >
                <option value="" disabled hidden>
                  Select Branch
                </option>
                <option value="cse">Computer Science</option>
                <option value="ece">Electronics</option>
                <option value="mech">Mechanical</option>
                <option value="civil">Civil</option>
              </select>
              <ChevronDown className="mr-3 text-gray-500" size={20} />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-orange-500 rounded-full text-white font-semibold hover:bg-orange-600 transition duration-200 cursor-pointer flex justify-center"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
                  <span>Loading...</span>
                </div>
              ) : (
                <> Signup </>
              )}
            </motion.button>
          </form>

          <div className="flex justify-center text-sm text-gray-600">
            <Link
              to="/login"
              className="text-[12px] md:text-sm hover:underline"
            >
              Already have an account?{" "}
              <span className="text-orange-500">Login</span>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 w-1/3"></div>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 w-1/3"></div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex   bg-gray-200 items-center justify-center gap-2 py-3  rounded-full hover:bg-gray-100 hover:border-black transition cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign-up using Google
          </motion.button>
        </div>
      </motion.div>

      {/* Right Section (Hidden on small devices) */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-primary via-theme to-secondary overflow-hidden">
        {/* SVG Pattern Overlay */}
        <svg
          className="absolute inset-0 w-full h-full bg-opacity-20 pointer-events-none z-20"
          width="100%"
          height="100%"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="150" cy="200" r="80" fill="white" fillOpacity="0.18" />
          <circle cx="500" cy="600" r="120" fill="white" fillOpacity="0.13" />
          <circle cx="450" cy="150" r="60" fill="white" fillOpacity="0.13" />
          <circle cx="200" cy="650" r="40" fill="white" fillOpacity="0.10" />
          <line
            x1="0"
            y1="400"
            x2="600"
            y2="400"
            stroke="white"
            strokeOpacity="0.07"
            strokeWidth="4"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="800"
            stroke="white"
            strokeOpacity="0.07"
            strokeWidth="4"
          />
        </svg>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="text-center text-accent px-6">
            <h2 className="text-lg md:text-xl">welcome to</h2>
            <h1 className="text-3xl md:text-4xl font-bold">
              edu<span className="text-primary">Connect</span>
            </h1>
            <p className="mt-2 text-sm md:text-base text-accent">
              Learn Together ,{" "}
              <span className="font-semibold">Succeed Together</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

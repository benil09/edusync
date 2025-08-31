import { motion } from "framer-motion";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 bg-theme"
      >
        <div className="w-full max-w-md space-y-6">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-center text-theme-1"
          >
            <span className="text-gray-400"> Login to </span> edu
            <span className="text-primary">Connect</span>
          </motion.h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center bg-secondary rounded-xl">
              <Mail className="text-theme-2 w-5 h-5 ml-3" />
              <input
                type="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Username"
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none  focus:ring-primary"
                required
              />
            </div>
            <div className="flex items-center bg-secondary rounded-xl">
              <Lock className="text-theme-2 w-5 h-5 ml-3" />
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none focus:ring-primary"
              />
              {passwordVisible ? (
                <Eye
                  size={20}
                  className="mx-4 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="mx-4 text-gray-400   cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-primary rounded-full text-accent font-semibold hover:bg-hover transition duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <> Login </>
                )}
              </div>
            </motion.button>
          </form>

          <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm text-theme-2">
            <Link
              to="/signup"
              className="text-[12px] md:text-sm hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="text-[12px] md:text-sm hover:underline"
            >
              Don’t have an account?{" "}
              <span className="text-primary">Signup</span>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="border-t border-accent w-1/3"></div>
            <span className="px-2 text-theme-2 text-sm">OR</span>
            <div className="border-t border-accent w-1/3"></div>
          </div>

          <button className="w-full flex bg-secondary items-center justify-center gap-2 py-3 rounded-full hover:bg-theme-2/20 transition cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-theme-1">Login using Google</span>
          </button>
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

export default LoginPage;

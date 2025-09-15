import React, { useState } from "react";

import { useLoginMutation } from '../features/auth/authApi';

import { useNavigate, Link } from "react-router-dom";
import SignUp from "./SignUp";

import { MdKey } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import OTPModal from "../Component/OtpModal"; // Import the OTP Modal component


const IMAGE_URL =
  "https://png.pngtree.com/thumb_back/fh260/background/20240103/pngtree-luminous-vector-background-with-abstract-white-texture-for-creative-designs-image_13880263.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [userTempData, setUserTempData] = useState(null);


  // const dispatch = useDispatch();
  const [login, {isLoading, error}] = useLoginMutation();

  const navigate = useNavigate();

   const isDevelopmentMode = process.env.NODE_ENV === 'development';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      // const user = await loginUser(email, password);
      await login({ email, password }).unwrap();
      navigate("/otp");

      
       
      

    } catch (err) {
      console.error("Login error", err);
      alert("Login failed");
    }
  };

  
  

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left IMAGE section */}
      <div
        className="w-full md:w-1/2 h-64 md:h-screen"
        style={{
          backgroundImage: `url(${IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right LOGIN section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-6 md:px-24 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-2">Sign In</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Enter your email and password to access your dashboard
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-sm"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm0 0l8 7 8-7" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                  placeholder="festiva@getapui.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdKey size={20} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded bg-gray-500 text-white font-medium hover:bg-gray-600 transition"
            >
              Login
            </button>
            {error && <div style={{ color: 'red' }}>Login failed</div>}
          </form>
          <div className="text-center mt-8 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {/* <OTPModal
        isOpen={showOtpModal}
        
        email={email}
        isLoading={isOtpLoading}
      /> */}
    </div>
  );
};

export default Login;

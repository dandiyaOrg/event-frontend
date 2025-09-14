import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const IMAGE_URL =
  "https://png.pngtree.com/thumb_back/fh260/background/20240103/pngtree-luminous-vector-background-with-abstract-white-texture-for-creative-designs-image_13880263.png";

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });


  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

 const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call register API
      const user = await registerUser(details);

      if (user?.id) {
        // On success dispatch login redux and navigate
        dispatch(login());
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Register Error", err);
      alert("Registration error");
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

      {/* Right FORM section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-6 md:px-24 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-2">Sign Up</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Create an account to get started.
          </p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-gray-700 mb-1 text-sm"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {/* User Icon */}
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="10" cy="7" r="4" />
                      <path d="M2 18c0-3 4-5 8-5s8 2 8 5" />
                    </svg>
                  </span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={details.firstName}
                    onChange={onChange}
                    placeholder="First Name"
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  className="block text-gray-700 mb-1 text-sm"
                  htmlFor="lastName"
                >
                  Last name
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
                      <circle cx="10" cy="7" r="4" />
                      <path d="M2 18c0-3 4-5 8-5s8 2 8 5" />
                    </svg>
                  </span>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={details.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-gray-700 mb-1 text-sm"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* Email Icon */}
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
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={details.email}
                  onChange={onChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-700 mb-1 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* Lock Icon */}
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="8" width="14" height="9" rx="2" />
                    <path d="M7 8V6a3 3 0 1 1 6 0v2" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={details.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#78833f]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10 10 0 0 0 2.06 4.06M9 9a3 3 0 0 1 3 3m-3 0a3 3 0 0 0 3-3m0 0L2 2m16 16l-5-5"></path>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7zm9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded bg-[#656a6e] text-white font-medium hover:bg-[#414346] transition"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-8 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const ProfilePopup = ({ onClose, onLogin, onCreateAccount }) => {
  const [newUser, setNewUser] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    if (newUser) {
      const payload = { action: "create_account", ...data };
      console.log("Create Account Data:", JSON.stringify(payload));
      if (onCreateAccount) onCreateAccount(payload);
    } else {
      const payload = { action: "login", username: data.username, password: data.password };
      console.log("Login Data:", JSON.stringify(payload));
      if (onLogin) onLogin(payload);
    }
    onClose();
    reset();
    setNewUser(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm ${
        darkMode ? " bg-opacity-70" : " bg-opacity-50"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`rounded-lg p-6 w-96 shadow-2xl relative max-h-[90vh] overflow-y-auto
          ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
        `}
      >
        <h2 className="text-xl font-semibold mb-4">{newUser ? "Create New Account" : "Login"}</h2>

        {newUser ? (
<>
  <input
    type="text"
    placeholder="First Name"
    {...register("firstName", { required: "First Name is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.firstName
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.firstName && <p className="text-red-500 text-sm mb-2">{errors.firstName.message}</p>}

  <input
    type="text"
    placeholder="Last Name"
    {...register("lastName", { required: "Last Name is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.lastName
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.lastName && <p className="text-red-500 text-sm mb-2">{errors.lastName.message}</p>}

  <input
    type="text"
    placeholder="Country"
    {...register("country", { required: "Country is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.country
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.country && <p className="text-red-500 text-sm mb-2">{errors.country.message}</p>}

  <input
    type="text"
    placeholder="Birthday (e.g. 13 July 1983)"
    {...register("birthday", { required: "Birthday is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.birthday
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.birthday && <p className="text-red-500 text-sm mb-2">{errors.birthday.message}</p>}

  <input
    type="text"
    placeholder="Occupation"
    {...register("occupation", { required: "Occupation is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.occupation
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.occupation && <p className="text-red-500 text-sm mb-2">{errors.occupation.message}</p>}

  <input
    type="email"
    placeholder="Email"
    {...register("email", {
      required: "Email is required",
      pattern: { value: /^\S+@\S+$/, message: "Invalid email address" },
    })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.email
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

  <input
    type="text"
    placeholder="Mobile"
    {...register("mobile", { required: "Mobile is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.mobile
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.mobile && <p className="text-red-500 text-sm mb-2">{errors.mobile.message}</p>}

  <input
    type="text"
    placeholder="Phone"
    {...register("phone", { required: "Phone is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.phone
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone.message}</p>}

  <input
    type="text"
    placeholder="Username"
    {...register("username", { required: "Username is required" })}
    className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.username
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}

  <input
    type="password"
    placeholder="Password"
    {...register("password", { required: "Password is required" })}
    className={`w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      errors.password
        ? "border-red-500 focus:ring-red-500"
        : darkMode
        ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
        : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
    }`}
  />
  {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
</>

        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className={`w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : darkMode
                  ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
                  : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : darkMode
                  ? "border-gray-600 focus:ring-green-500 bg-gray-800 text-gray-200"
                  : "border-gray-300 focus:ring-green-500 bg-white text-gray-900"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
          </>
        )}

        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded hover:bg-gray-400 ${
              darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-300 text-gray-900"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {newUser ? "Create Account" : "Log In"}
          </button>
        </div>

        <div
          className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => setNewUser(!newUser)}
        >
          {newUser ? "Already have an account? Log In" : "New user? Create account"}
        </div>
      </form>
    </div>
  );
};

export default ProfilePopup;

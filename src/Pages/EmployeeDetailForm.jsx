import React, { useState } from "react";
import InputField from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../Components/ErrorPopup";
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  Lock,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import { useRegisterEmployeeMutation } from "../features/employee/employeeApi";

const AddNewEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerEmployee, { isLoading, isError, error }] =
    useRegisterEmployeeMutation();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile_no: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.mobile_no.trim())
      newErrors.mobile_no = "Mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (
      formData.mobile_no &&
      !phoneRegex.test(formData.mobile_no.replace(/\D/g, ""))
    ) {
      newErrors.mobile_no = "Please enter a valid 10-digit mobile number";
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Username validation
    if (formData.username && formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Create payload without confirmPassword
      const { confirmPassword, ...employeeData } = formData;

      // Call the API
      await registerEmployee(employeeData).unwrap();

      // Success - redirect to employees list
      navigate("/employees", {
        state: {
          message: `Employee ${formData.name} has been added successfully!`,
        },
      });
    } catch (error) {
      console.error("Error adding employee:", error);

      // Handle API errors
      if (error?.data?.message) {
        setErrors({ submit: error.data.message });
      } else if (error?.data?.errors) {
        // Handle validation errors from backend
        setErrors(error.data.errors);
      } else {
        setErrors({ submit: "Failed to add employee. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/employees")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Employees</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Employee
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{errors.submit}</span>
              </div>
            </div>
          )}

          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                icon={User}
                placeholder="John Doe"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <InputField
                label="Username"
                name="username"
                icon={User}
                placeholder="johndoe"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                icon={Mail}
                placeholder="john@company.com"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <InputField
                label="Mobile Number"
                name="mobile_no"
                type="tel"
                icon={Phone}
                placeholder="9876543210"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Password"
                name="password"
                type="password"
                icon={Lock}
                placeholder="Enter secure password"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                icon={Lock}
                placeholder="Confirm password"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 flex-1 sm:flex-none"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Add Employee</span>
                </>
              )}
            </button>
          </div>
        </form>
        <ErrorPopup isError={isError} error={error} />
      </div>
    </div>
  );
};

export default AddNewEmployee;

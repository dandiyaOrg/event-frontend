import React, { useState, useEffect } from "react";
import { useUpdateEmployeeMutation } from "../features/employee/employeeApi";
import InputField from "../Components/InputField";
import ErrorPopup from "../Components/ErrorPopup";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, UserCheck } from "lucide-react";

const EmployeeEditForm = ({ onClose, onSuccess }) => {
  const { employeeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Individual state for each field
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");


  const employee = location.state?.employee || null;

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [updateEmployee, { isLoading, isError, error }] = useUpdateEmployeeMutation();
  const [successMessage, setSuccessMessage] = useState("");

  // Pre-populate fields when employee data is available
  useEffect(() => {
    if (employee) {
      setFullName(employee.name || employee.fullName || "");
      setUserName(employee.username || employee.userName || "");
      setEmail(employee.email || "");
      setMobile(employee.mobile_no || employee.mobile || "");
      setPassword(""); // Don't pre-fill password for security
    }
  }, [employee]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (errors.userName) {
      setErrors((prev) => ({ ...prev, userName: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    const value = e.target.value;
    if (value && !validatePasswordStrength(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    }
  };

  const validatePasswordStrength = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePasswordStrength(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!employee || !employee.employee_id) {
      setErrors({
        submit: "Employee data not found. Please try again.",
      });
      return;
    }

    const formData = {
      name: fullName, // Backend expects 'name' not 'fullName'
      username: userName, // Backend expects 'username' not 'userName'
      email: email,
      mobile_no: mobile, // Backend expects 'mobile_no' not 'mobile'
      password: password,
    };

    try {
      await updateEmployee({
        employeeId: employee.employee_id,
        employee: formData,
      }).unwrap();

      // ✅ Set success message
      setSuccessMessage("Employee updated successfully!");

      // ✅ Navigate back to employees table after 2 seconds
      setTimeout(() => {
        navigate("/employees"); // or navigate(-1) to go to previous page
        onClose?.();
      }, 2000);

      onSuccess?.("Employee updated successfully!");
    } catch (error) {
      console.error("Failed to update employee:", error);
      
    }
  };

  if (!employee) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-600 mb-2">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we load employee data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Employee</h2>
        <p className="text-gray-600">Update employee information</p>
      </div>

      {/* ✅ Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-600 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {/* ✅ RTK Query Error Display */}
     

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          icon={User}
          required={true}
          value={fullName}
          handleChange={handleFullNameChange}
          errors={errors}
          placeholder="Enter full name"
        />

        <InputField
          label="User Name"
          name="userName"
          type="text"
          icon={UserCheck}
          required={true}
          value={userName}
          handleChange={handleUserNameChange}
          errors={errors}
          placeholder="Enter username"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          required={true}
          value={email}
          handleChange={handleEmailChange}
          errors={errors}
          placeholder="Enter email address"
        />

        <InputField
          label="Mobile"
          name="mobile"
          type="tel"
          icon={Phone}
          required={true}
          value={mobile}
          handleChange={handleMobileChange}
          errors={errors}
          placeholder="Enter mobile number"
        />

        <InputField
          label="Password"
          name="password"
          icon={Lock}
          required={true}
          value={password}
          handleChange={handlePasswordChange}
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder="Enter password"
        />

        

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </div>
            ) : (
              "Update Employee"
            )}
          </button>
        </div>
      </form>

      {/* Error Popup - Only shows when isError is true */}
      <ErrorPopup 
        isError={isError} 
        error={error} 
      />
    </div>
  );
};

export default EmployeeEditForm;

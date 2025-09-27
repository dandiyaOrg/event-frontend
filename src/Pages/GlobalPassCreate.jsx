import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  IndianRupee,
  Tag,
  Percent,
  ToggleLeft,
  ToggleRight,
  Ticket,
  Globe,
  Sparkles
} from "lucide-react";
import InputField from "../Components/InputField";
// import { useCreateGlobalPassMutation } from "../features/passTable/PassTableApi"; // Update to use global pass API

const GlobalPassCreate = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Use the create global pass mutation
//   const [createGlobalPass, { isLoading: isSubmitting }] = " ";

  const [formData, setFormData] = useState({
    category: "",
    total_price: "",
    discount_percentage: "",
    is_active: false,
    description: "", // Additional field for global passes
    validity_days: "", // How long the pass is valid
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      is_active: !prev.is_active,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.total_price) {
      newErrors.total_price = "Total price is required";
    } else if (parseFloat(formData.total_price) <= 0) {
      newErrors.total_price = "Total price must be greater than 0";
    }

    if (
      formData.discount_percentage &&
      (parseFloat(formData.discount_percentage) < 0 ||
        parseFloat(formData.discount_percentage) > 100)
    ) {
      newErrors.discount_percentage =
        "Discount percentage must be between 0 and 100";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required for global passes";
    }

    if (!formData.validity_days) {
      newErrors.validity_days = "Validity period is required";
    } else if (parseInt(formData.validity_days) <= 0) {
      newErrors.validity_days = "Validity days must be greater than 0";
    }

    return newErrors;
  };

  const calculateFinalPrice = () => {
    const total = parseFloat(formData.total_price) || 0;
    const discount = parseFloat(formData.discount_percentage) || 0;
    return total - (total * discount) / 100;
  };

  // Updated handleSubmit for global pass
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Prepare data for global pass API
      const globalPassData = {
        category: formData.category.trim(),
        total_price: parseFloat(formData.total_price),
        discount_percentage: parseFloat(formData.discount_percentage) || 0,
        is_active: formData.is_active,
        description: formData.description.trim(),
        validity_days: parseInt(formData.validity_days),
      };

      console.log("Submitting global pass data:", globalPassData);

      // Call the global pass mutation
      await createGlobalPass(globalPassData).unwrap();

      // Success - navigate back to global passes list
      navigate("/global-passes", {
        state: {
          message: `Global pass "${formData.category}" has been created successfully!`,
        },
      });
    } catch (error) {
      console.error("Failed to create global pass:", error);

      // Handle API errors
      if (error?.data?.message) {
        setErrors({ submit: error.data.message });
      } else if (error?.data?.errors) {
        const errorMessages = error.data.errors;
        if (Array.isArray(errorMessages)) {
          setErrors({ submit: errorMessages.join(", ") });
        } else {
          setErrors(errorMessages);
        }
      } else {
        setErrors({
          submit: error?.message || "Failed to create global pass. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate("/events")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group px-3 py-2 rounded-lg hover:bg-white/50"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Events</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-xl shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-indigo-800 to-cyan-700 bg-clip-text text-transparent">
                Create Global Pass
              </h1>
              <p className="text-gray-600 mt-1">
                Create a universal pass valid across all events
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Submit error display */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6 rounded-lg">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">
                    {errors.submit}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Pass Details Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Global Pass Details
                </h3>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-3">
               

                

                {errors.category && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <p className="text-red-600 text-sm font-medium">
                      {errors.category}
                    </p>
                  </div>
                )}
              </div>

              {/* Description Field */}
              <InputField
                label="Pass Description"
                name="description"
                type="textarea"
                icon={Ticket}
                placeholder="Describe what this global pass includes and its benefits..."
                value={formData.description}
                handleChange={handleChange}
                errors={errors}
                required={true}
                variant="filled"
                helperText="Detailed description of global pass features and benefits"
                rows={4}
              />

              {/* Validity Days */}
              <InputField
                label="Validity Period (Days)"
                name="validity_days"
                type="number"
                icon={Globe}
                placeholder="365"
                value={formData.validity_days}
                handleChange={handleChange}
                errors={errors}
                required={true}
                min="1"
                step="1"
                variant="filled"
                helperText="How many days this pass remains valid after purchase"
              />
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <IndianRupee className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Pricing Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Price */}
                <InputField
                  label="Total Price"
                  name="total_price"
                  type="number"
                  icon={IndianRupee}
                  placeholder="0.00"
                  value={formData.total_price}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                  min="0"
                  step="0.01"
                  variant="filled"
                  helperText="Base price for this global pass"
                />

                {/* Discount Percentage */}
                <InputField
                  label="Discount Percentage"
                  name="discount_percentage"
                  type="number"
                  icon={Percent}
                  placeholder="0"
                  value={formData.discount_percentage}
                  handleChange={handleChange}
                  errors={errors}
                  required={false}
                  min="0"
                  max="100"
                  step="0.1"
                  variant="filled"
                  helperText="Optional discount (0-100%)"
                />
              </div>

              {/* Final Price Display */}
              {formData.total_price && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold">
                          Final Price
                        </p>
                        <p className="text-green-600 text-sm">
                          After discount applied
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-800">
                        ₹{calculateFinalPrice().toFixed(2)}
                      </p>
                      {formData.discount_percentage &&
                        parseFloat(formData.discount_percentage) > 0 && (
                          <p className="text-sm text-green-600">
                            Save ₹
                            {(
                              parseFloat(formData.total_price) -
                              calculateFinalPrice()
                            ).toFixed(2)}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Valid for:</span>
                      <span className="font-semibold text-green-800">
                        {formData.validity_days || 0} days
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Status Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <ToggleLeft className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Global Pass Status
                </h3>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.is_active
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {formData.is_active ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Global Pass Active Status
                    </p>
                    <p className="text-sm text-gray-600">
                      {formData.is_active
                        ? "Pass is active and available for purchase globally"
                        : "Pass is inactive and not available for purchase"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    formData.is_active ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                //   disabled={isSubmitting}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_active ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/global-passes")}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                // disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-lg hover:shadow-xl"
                // disabled={isSubmitting}
              >
                {/* {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Global Pass...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Create Global Pass</span>
                  </div>
                )} */}
                Create Global Pass
              </button>
            </div>
          </form>
        </div>

       
      </div>
    </div>
  );
};

export default GlobalPassCreate;

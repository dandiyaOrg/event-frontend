import React, { useState } from "react";
import { X } from "lucide-react";

const CreateNewPass = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unitPrice: "",
    discountPercent: "",
    finalPrice: "",
  });

  const [errors, setErrors] = useState({});

  // Calculate final price automatically when unit price or discount changes
  React.useEffect(() => {
    const unitPrice = parseFloat(formData.unitPrice) || 0;
    const discountPercent = parseFloat(formData.discountPercent) || 0;
    const finalPrice = unitPrice - (unitPrice * discountPercent) / 100;
    
    if (unitPrice > 0) {
      setFormData(prev => ({
        ...prev,
        finalPrice: finalPrice.toFixed(2)
      }));
    }
  }, [formData.unitPrice, formData.discountPercent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Pass name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      newErrors.unitPrice = "Valid unit price is required";
    }

    if (formData.discountPercent && (parseFloat(formData.discountPercent) < 0 || parseFloat(formData.discountPercent) > 100)) {
      newErrors.discountPercent = "Discount must be between 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create the pass object
      const newPass = {
        id: Date.now(),
        name: formData.name.trim(),
        category: formData.category.trim(),
        unitPrice: parseFloat(formData.unitPrice),
        discountPercent: parseFloat(formData.discountPercent) || 0,
        finalPrice: parseFloat(formData.finalPrice),
        passesSold: 0,
      };

      onSubmit(newPass);
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: "",
      category: "",
      unitPrice: "",
      discountPercent: "",
      finalPrice: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Pass</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-4">
            {/* Pass Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Pass Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., VIP Pass, Early Bird"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Basic">Basic</option>
                <option value="Student">Student</option>
                <option value="Group">Group</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Pricing Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (₹) *
                </label>
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                    errors.unitPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1000"
                />
                {errors.unitPrice && <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>}
              </div>

              <div>
                <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discountPercent"
                  name="discountPercent"
                  value={formData.discountPercent}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                    errors.discountPercent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10"
                />
                {errors.discountPercent && <p className="text-red-500 text-xs mt-1">{errors.discountPercent}</p>}
              </div>
            </div>

            {/* Final Price */}
            <div>
              <label htmlFor="finalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Final Price (₹)
              </label>
              <input
                type="number"
                id="finalPrice"
                name="finalPrice"
                value={formData.finalPrice}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Add Pass
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPass;
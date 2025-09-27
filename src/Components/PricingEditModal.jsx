// components/PricingEditModal.jsx (create this file)
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  IndianRupee, 
  Percent, 
  Calculator,
  AlertCircle
} from 'lucide-react';

const PricingEditModal = ({ 
  isOpen, 
  onClose, 
  currentPricing, 
  onSave, 
  isLoading = false,
  title = "Edit Pricing" 
}) => {
  const [formData, setFormData] = useState({
    total_price: '',
    discount_percentage: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && currentPricing) {
      setFormData({
        total_price: currentPricing.total_price || '',
        discount_percentage: currentPricing.discount_percentage || ''
      });
      setErrors({});
    }
  }, [isOpen, currentPricing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.total_price || formData.total_price === '') {
      newErrors.total_price = 'Original price is required';
    } else if (parseFloat(formData.total_price) <= 0) {
      newErrors.total_price = 'Price must be greater than 0';
    }

    if (formData.discount_percentage !== '' && formData.discount_percentage !== null) {
      const discount = parseFloat(formData.discount_percentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discount_percentage = 'Discount must be between 0-100%';
      }
    }

    return newErrors;
  };

  const calculateFinalPrice = () => {
    const total = parseFloat(formData.total_price) || 0;
    const discount = parseFloat(formData.discount_percentage) || 0;
    return total - (total * discount) / 100;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const pricingData = {
        total_price: parseFloat(formData.total_price),
        discount_percentage: parseFloat(formData.discount_percentage) || 0
      };
      
      await onSave(pricingData);
    } catch (error) {
      setErrors({ submit: 'Failed to save pricing changes. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm text-blue-100">Update pricing information</p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {errors.submit && (
              <div className="mb-6 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm font-medium text-red-800">{errors.submit}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Original Price */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <IndianRupee className="h-4 w-4 text-blue-500" />
                  <span>Original Price</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="total_price"
                    value={formData.total_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full rounded-xl border-2 py-3 pl-12 pr-4 transition-all duration-200 focus:outline-none ${
                      errors.total_price
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                    }`}
                    placeholder="0.00"
                    disabled={isLoading}
                  />
                </div>
                {errors.total_price && (
                  <p className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.total_price}</span>
                  </p>
                )}
              </div>

              {/* Discount Percentage */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Percent className="h-4 w-4 text-orange-500" />
                  <span>Discount Percentage</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className={`w-full rounded-xl border-2 py-3 pl-12 pr-4 transition-all duration-200 focus:outline-none ${
                      errors.discount_percentage
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
                    }`}
                    placeholder="0"
                    disabled={isLoading}
                  />
                </div>
                {errors.discount_percentage && (
                  <p className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.discount_percentage}</span>
                  </p>
                )}
              </div>

              {/* Price Preview */}
              {formData.total_price && !errors.total_price && (
                <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Original Price:</span>
                      <span className="font-bold text-green-900">₹{parseFloat(formData.total_price).toFixed(2)}</span>
                    </div>
                    
                    {formData.discount_percentage && parseFloat(formData.discount_percentage) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Discount ({formData.discount_percentage}%):</span>
                        <span className="font-bold text-green-900">-₹{(parseFloat(formData.total_price) - calculateFinalPrice()).toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between border-t border-green-200 pt-2">
                      <span className="font-bold text-green-800">Final Price:</span>
                      <span className="text-xl font-bold text-green-900">₹{calculateFinalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 rounded-xl border-2 border-gray-300 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || Object.keys(validateForm()).length > 0}
                className="flex flex-1 items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingEditModal;

// components/PassEditForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
   
  Tag, 
  Percent,
  ToggleLeft,
  ToggleRight,
  Ticket,
  Edit3,
  IndianRupee
} from 'lucide-react';
import InputField from '../Components/InputField';
import { useUpdatePassMutation } from '../features/passTable/PassTableApi';

const PassEditForm = () => {
  const navigate = useNavigate();
  const { eventId, subEventId, passId } = useParams();
  const location = useLocation();
  const [errors, setErrors] = useState({});

  // Get pass data from location state
  const passFromState = location.state?.pass;

  // Use update mutation
  const [updatePass, { isLoading: isSubmitting }] = useUpdatePassMutation();

  // Initialize form with existing pass data
  const [formData, setFormData] = useState({
    category: passFromState?.category || '',
    total_price: passFromState?.total_price || '',
    discount_percentage: passFromState?.discount_percentage || '',
    is_active: passFromState?.is_active ?? false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleToggle = () => {
    setFormData(prev => ({
      ...prev,
      is_active: !prev.is_active
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.total_price) {
      newErrors.total_price = 'Total price is required';
    } else if (parseFloat(formData.total_price) <= 0) {
      newErrors.total_price = 'Total price must be greater than 0';
    }

    if (formData.discount_percentage && (parseFloat(formData.discount_percentage) < 0 || parseFloat(formData.discount_percentage) > 100)) {
      newErrors.discount_percentage = 'Discount percentage must be between 0 and 100';
    }

    return newErrors;
  };

  const calculateFinalPrice = () => {
    const total = parseFloat(formData.total_price) || 0;
    const discount = parseFloat(formData.discount_percentage) || 0;
    return total - (total * discount / 100);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const passData = {
      category: formData.category.trim(),
      total_price: parseFloat(formData.total_price),
      discount_percentage: parseFloat(formData.discount_percentage) || 0,
      is_active: formData.is_active,
    };

    // ✅ Debug logging
    console.log('=== UPDATE PASS DEBUG ===');
    console.log('passId from params:', passId);
    console.log('passFromState.pass_id:', passFromState?.pass_id);
    console.log('passData to send:', passData);

    // ✅ Use the correct passId - use passFromState.pass_id if available
    const actualPassId = passFromState?.pass_id || passId;
    console.log('Using passId:', actualPassId);

    await updatePass({ 
      passId: actualPassId, 
      passData 
    }).unwrap();

    // Success - navigate back to pass detail
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/${actualPassId}`, {
      state: {
        message: `Pass "${formData.category}" has been updated successfully!`,
        pass: { 
          ...passFromState, 
          ...passData, 
          pass_id: actualPassId,
          final_price: calculateFinalPrice().toString()
        }
      }
    });

  } catch (error) {
    console.error('=== UPDATE PASS ERROR ===');
    console.error('Full error object:', error);
    console.error('Error status:', error?.status);
    console.error('Error originalStatus:', error?.originalStatus);
    console.error('Error data:', error?.data);
    
    // Better error handling
    if (error?.status === 'PARSING_ERROR' && error?.originalStatus === 404) {
      alert('Pass not found. The URL might be incorrect or the pass may have been deleted.');
    } else if (error?.status === 'PARSING_ERROR') {
      alert('Server returned an invalid response. Please check if the API endpoint exists.');
    } else if (error?.originalStatus === 404) {
      alert('API endpoint not found. Please check your backend routes.');
    } else {
      alert(`Failed to update pass: ${error?.data?.message || error?.message || 'Unknown error'}`);
    }
  }
};

  // If no pass data, redirect back
  if (!passFromState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            No Pass Data Found
          </h3>
          <p className="text-red-600 mb-6">
            Please select a pass from the passes list to edit.
          </p>
          <button 
            onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}/passes`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Back to Passes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}/passes/${passId}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group px-3 py-2 rounded-lg hover:bg-white/50"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Pass Details</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Edit Pass
              </h1>
              <p className="text-gray-600 mt-1">
                Update pass information
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
                <Tag className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Pass Details
                </h3>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800 mb-3">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span>Pass Category</span>
                  <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-10 py-4 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 border-2 rounded-2xl transition-all duration-500 ease-in-out text-gray-900 font-bold shadow-xl hover:shadow-2xl focus:outline-none focus:bg-white appearance-none cursor-pointer backdrop-blur-sm transform hover:scale-[1.02] focus:scale-[1.02] ${
                      errors.category 
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-blue-300'
                    } ${formData.category ? 'text-gray-900' : 'text-gray-500'}`}
                    required
                  >
                    <option value="" disabled className="text-gray-400 font-medium">
                      ✨ Choose your pass type
                    </option>
                    <option value="Group" className="py-3 text-blue-900 font-semibold bg-gradient-to-r from-blue-50 to-blue-100">
                      👥 Group Pass • Multiple people entry
                    </option>
                    <option value="Stag Male" className="py-3 text-green-900 font-semibold bg-gradient-to-r from-green-50 to-green-100">
                      👨 Stag Male Pass • Single male entry
                    </option>
                    <option value="Stag Female" className="py-3 text-pink-900 font-semibold bg-gradient-to-r from-pink-50 to-pink-100">
                      👩 Stag Female Pass • Single female entry
                    </option>
                    <option value="Couple" className="py-3 text-purple-900 font-semibold bg-gradient-to-r from-purple-50 to-purple-100">
                      💑 Couple Pass • Two person entry
                    </option>
                    <option value="Full Pass" className="py-3 text-orange-900 font-semibold bg-gradient-to-r from-orange-50 to-orange-100">
                      🎫 Full Access Pass • Complete event access
                    </option>
                  </select>
                  
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
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
                  helperText="Base price before any discounts"
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
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold">Final Price</p>
                        <p className="text-green-600 text-sm">After discount applied</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-800">
                        ₹{calculateFinalPrice().toFixed(2)}
                      </p>
                      {formData.discount_percentage && parseFloat(formData.discount_percentage) > 0 && (
                        <p className="text-sm text-green-600">
                          Save ₹{(parseFloat(formData.total_price) - calculateFinalPrice()).toFixed(2)}
                        </p>
                      )}
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
                  Pass Status
                </h3>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    formData.is_active 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {formData.is_active ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pass Active Status</p>
                    <p className="text-sm text-gray-600">
                      {formData.is_active 
                        ? 'Pass is active and available for purchase'
                        : 'Pass is inactive and not available for purchase'
                      }
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    formData.is_active ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  disabled={isSubmitting}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}/passes/${passId}`)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating Pass...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Update Pass</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Updated Pass Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Category:</span>
              <p className="font-medium text-gray-900">{formData.category || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <p className={`font-medium ${formData.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Original Price:</span>
              <p className="font-medium text-gray-900">₹{formData.total_price || '0.00'}</p>
            </div>
            <div>
              <span className="text-gray-600">Final Price:</span>
              <p className="font-medium text-green-600">₹{calculateFinalPrice().toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassEditForm;

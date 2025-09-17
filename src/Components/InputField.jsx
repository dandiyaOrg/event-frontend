import React from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  icon: Icon, 
  required = false, 
  formData,
  handleChange,
  errors = {},
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  placeholder,
  value,
  disabled = false,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          type={
            name === 'password'
              ? (showPassword ? 'text' : 'password')
              : name === 'confirmPassword'
              ? (showConfirmPassword ? 'text' : 'password')
              : type
          }
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            errors[name] 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
        
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword?.(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
        
        {name === 'confirmPassword' && (
          <button
            type="button"
            onClick={() => setShowConfirmPassword?.(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      
      {errors[name] && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;

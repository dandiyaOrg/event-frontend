import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useToggleStatusMutation } from '../features/employee/employeeApi';
import { useDeleteEmployeeMutation } from '../features/employee/employeeApi';
import ToggleSwitch from '../Components/ToggleSwitch';
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  Shield, 
  Edit3,
  MoreHorizontal,
  Star,
  Award,
  Clock,
  Building,
  Trash2,
  Eye, 
  EyeOff,
  AlertTriangle,
  X
} from 'lucide-react';

const EmployeeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // ✅ Add local employee state to manage updates
  const [employee, setEmployee] = useState(location.state?.employee || null);
  
  // RTK Query mutations
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const [toggleStatus, { isLoading }] = useToggleStatusMutation();

  console.log("Employee Detail:", employee);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h2>
          <p className="text-gray-600 mb-8">The requested employee could not be found.</p>
          <button 
            onClick={() => navigate('/employees')} 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/employees/${employee.employee_id}/edit`, { state: { employee } });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(employee.employee_id).unwrap();
      alert('Employee deleted successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Failed to delete employee:', error);
      alert(error.data?.message || 'Failed to delete employee. Please try again.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  //  Updated toggle handler with optimistic updates
  const handleStatusToggle = async () => {
    const currentStatus = employee.status;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      //  Optimistic update - update UI immediately
      setEmployee(prev => ({
        ...prev,
        status: newStatus
      }));

      // Call the API to toggle status
      await toggleStatus(employee.employee_id).unwrap();
      
      // Show success message
      alert(`Employee status updated to ${newStatus}`);
      
    } catch (error) {
      console.error('Failed to toggle status:', error);
      
      // Revert the optimistic update if API call fails
      setEmployee(prev => ({
        ...prev,
        status: currentStatus
      }));
      
      alert('Failed to update employee status. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Employee</h3>
              </div>
              <button 
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{employee.name}</span>? 
                This action cannot be undone.
              </p>
              
              {/* Employee Info Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete Employee'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/employees')} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Employees</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <ToggleSwitch
                isActive={employee.status === 'active'}
                onToggle={handleStatusToggle}
                isLoading={isLoading}
                employeeName={employee.name}
              />
              <button 
                onClick={handleEdit}
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Header with Gradient */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 h-32 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              {/* Profile Content */}
              <div className="relative px-6 pb-6">
                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{employee.name}</h1>
                  <p className="text-gray-600 mb-2">@{employee.username}</p>
                  <div className="flex items-center justify-center space-x-2">
                    {/* ✅ Dynamic status badge based on current employee state */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        employee.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      {employee.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  <a 
                    href={`mailto:${employee.email}`}
                    className="flex items-center justify-center space-x-2 w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                  <a 
                    href={`tel:${employee.mobile_no}`}
                    className="flex items-center justify-center space-x-2 w-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of your component remains the same */}
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="font-medium text-gray-900">{employee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Mobile Number</p>
                      <p className="font-medium text-gray-900">{employee.mobile_no}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Username</p>
                      <p className="font-medium text-gray-900">@{employee.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Security & Access</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {showPassword ? employee.password : "••••••••"}
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

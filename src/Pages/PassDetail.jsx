// components/PassDetail.jsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetPassByIdQuery,useDeletePassMutation } from '../features/passTable/PassTableApi';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Tag, 
  DollarSign, 
  Percent,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  Info,
  Activity,
  CreditCard,
  Users,
  TrendingUp,
  IndianRupee
} from 'lucide-react';

const PassDetail = () => {
  const { eventId, subEventId, passId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get pass data from location state or API
  const passFromState = location.state?.pass;
  const { data, error, isLoading } = useGetPassByIdQuery(passId, {
    skip: !!passFromState // Skip API call if we have data from state
  });
   const [deletePass, { isLoading: isDeleting }] = useDeletePassMutation();

  const pass = passFromState || data?.data || data;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-ping mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Pass Details</h3>
          <p className="text-slate-600">Fetching pass information...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !pass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Pass Not Found
          </h3>
          <p className="text-red-600 mb-6">
            {error?.data?.message || 'Could not load pass details. Please try again.'}
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

  const handleEdit = () => {
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/${passId}/edit`, {
      state: { pass }
    });
  };

const handleDelete = async () => {
  if (window.confirm(`Are you sure you want to delete "${pass.category}" pass?`)) {
    try {
      await deletePass(pass.pass_id).unwrap();
      navigate(`/events/${eventId}/subevents/${subEventId}/passes`, {
        state: { message: 'Pass deleted successfully!' }
      });
    } catch (err) {
      console.error('Failed to delete pass:', err);
      alert('Failed to delete pass. Please try again.');
    }
  }
};

  const handleBack = () => {
    navigate(`/events/${eventId}/subevents/${subEventId}/passes`);
  };

  // Calculate savings
  const totalPrice = parseFloat(pass.total_price || 0);
  const finalPrice = parseFloat(pass.final_price || 0);
  const savings = totalPrice - finalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group px-4 py-3 rounded-xl hover:bg-white/50 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-semibold">Back to Pass Management</span>
            </button>
          </div>
          
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Tag className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {pass.category} Pass
                  </h1>
                  <p className="text-blue-100 text-lg font-semibold mt-2 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Pass ID: {pass.pass_id}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleEdit}
                  className="group flex items-center space-x-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <span>Edit Pass</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  className="group flex items-center space-x-3 bg-red-500/90 hover:bg-red-600 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <span>Delete Pass</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pass Information Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Pass Information</h3>
                    <p className="text-slate-300 font-medium">Complete pass details and pricing</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">Category</p>
                        <p className="text-2xl font-black text-slate-900">{pass.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                        <IndianRupee className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Original Price</p>
                        <p className="text-2xl font-black text-slate-900">{pass.total_price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Discount */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                        <Percent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-orange-600 uppercase tracking-wide">Discount</p>
                        <p className="text-2xl font-black text-slate-900">{parseFloat(pass.discount_percentage || 0)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Final Price */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">Final Price</p>
                        <p className="text-2xl font-black text-slate-900">{pass.final_price}</p>
                      </div>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>

          {/* Right Column - Status & Actions */}
          <div className="space-y-8">
            {/* Status Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white">Pass Status</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-bold">Current Status</span>
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-sm ${
                    pass.is_active 
                      ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                      : 'bg-red-100 text-red-800 border-2 border-red-200'
                  }`}>
                    {pass.is_active ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="text-lg">
                      {pass.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <p className="text-slate-600 text-sm font-medium">
                    {pass.is_active 
                      ? '✅ This pass is currently active and available for purchase.'
                      : '⚠️ This pass is inactive and not available for purchase.'
                    }
                  </p>
                </div>
              </div>
            </div>

           
            {/* Additional Info Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white">Pass Details</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-semibold">Pass ID</span>
                  <span className="text-slate-900 font-bold">{pass.pass_id}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-semibold">Created</span>
                  <span className="text-slate-900 font-bold">
                    {new Date().toLocaleDateString('en-IN')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-600 font-semibold">Last Updated</span>
                  <span className="text-slate-900 font-bold">
                    {new Date().toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassDetail;

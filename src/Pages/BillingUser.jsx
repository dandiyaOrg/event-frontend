// components/BillingUsersPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import CustomizableTable from '../Components/CustomizableTable';
import { useGetAllBillingUsersForAdminQuery } from '../features/billingUser/BillingUserAPI';
import { Users, UserPlus, Search, Database, Sparkles } from 'lucide-react';

const allColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'mobile_no', label: 'Mobile Number' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'gender', label: 'Gender' },
  { key: 'age', label: 'Age' },
];

const BillingUsersPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading, refetch } = useGetAllBillingUsersForAdminQuery();

  const billingUsersData = data?.data?.billingUsers || [];

  const handleRowClick = (billingUser) => {
    // Navigate to billing user details or handle row click
    console.log('Clicked billing user:', billingUser);
    navigate(`/billingUsers/${billingUser.billing_user_id}`, { state: { billingUser } });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-ping mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Billing Users</h3>
          <p className="text-slate-600">Fetching user data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Error Loading Billing Users
          </h3>
          <p className="text-red-600 mb-6">
            {error?.data?.message || 'Failed to fetch billing users. Please try again.'}
          </p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state when no billing users exist
  if (!billingUsersData || billingUsersData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                      Billing Users
                    </h1>
                    <p className="text-blue-100 text-lg font-medium mt-2">
                      Manage billing users for your events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beautiful Empty State */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Empty State Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Get Started</h3>
                    <p className="text-slate-300 font-medium">No billing users found</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State Content */}
            <div className="p-12 text-center">
              <div className="relative mb-8">
                {/* Animated Empty State Icon */}
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <Users className="w-16 h-16 text-blue-600 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 -right-4 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-3xl font-black text-slate-900">
                  No Billing Users Yet
                </h3>
                <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
                  Start building your user base! Billing users will appear here once they register for events.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">User Management</h4>
                  <p className="text-blue-700 text-sm">Manage user profiles, contact information, and preferences</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-900 mb-2">Easy Search</h4>
                  <p className="text-purple-700 text-sm">Quickly find users by name, email, or phone number</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-900 mb-2">Data Insights</h4>
                  <p className="text-green-700 text-sm">View user statistics, demographics, and engagement metrics</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => refetch()}
                  className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Database className="w-5 h-5" />
                  </div>
                  <span>Refresh Data</span>
                </button>

                <button className="group flex items-center space-x-3 bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <div className="p-2 bg-slate-100 group-hover:bg-blue-100 rounded-xl group-hover:rotate-12 transition-all duration-300">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-t border-slate-200/50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-black text-slate-800">0</p>
                  <p className="text-sm font-semibold text-slate-600">Total Users</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800">0</p>
                  <p className="text-sm font-semibold text-slate-600">Active Events</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800">Ready</p>
                  <p className="text-sm font-semibold text-slate-600">System Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal state with data
  return (
    <div className="px-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Billing Users
                  </h1>
                  <p className="text-blue-100 text-lg font-medium mt-2">
                    {billingUsersData.length} users • Manage billing users for events
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl">
        <SearchBar 
          placeholder="🔍 Search billing users..."
          className="w-80 bg-white/80 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Users</p>
                <p className="text-4xl font-black text-white mt-1">{billingUsersData.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          <div className="relative z-10">
            <CustomizableTable
              data={billingUsersData}
              allColumns={allColumns}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingUsersPage;

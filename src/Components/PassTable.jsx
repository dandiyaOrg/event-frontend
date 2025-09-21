// components/PassTable.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import CustomizableTable from '../Components/CustomizableTable';
import { useGetAllPassesForSubeventQuery } from '../features/passTable/PassTableApi';
import { Plus } from 'lucide-react';

const passesColumns = [
 
  { key: "category", label: "Category" },
  { key: "total_price", label: "Unit Price" },
  { key: "discount_percentage", label: "Discount %" },
  { key: "final_price", label: "Final Price" },
];

const PassTable = () => {
  const { eventId, subEventId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch passes data
  const { data, error, isLoading } = useGetAllPassesForSubeventQuery(subEventId);

  console.log("Passes Data:", data);

  // Extract passes data from your API response structure
  const passesData = data?.message?.passes;

  // Format data for display
  const formatPassData = (passes) => {
    if (!Array.isArray(passes)) return [];
    
    return passes.map(pass => ({
      ...pass,
      total_price: pass.total_price ? `₹${parseFloat(pass.total_price).toFixed(2)}` : 'N/A',
      discount_percentage: pass.discount_percentage ? `${parseFloat(pass.discount_percentage)}%` : '0%',
      final_price: pass.final_price ? `₹${parseFloat(pass.final_price).toFixed(2)}` : 'N/A',
    }));
  };

  // Navigate to create pass page
  const handleNewPass = () => {
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/create`);
  };

  // Navigate to pass details page
  const handleRowClick = (pass) => {
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/${pass.pass_id}`, { 
      state: { pass } 
    });
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading passes...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Passes
          </h3>
          <p className="text-red-600 mb-4">
            {error?.data?.message || error?.message || 'Failed to fetch passes.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Pass Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage passes for this sub-event
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        
        <button 
          onClick={handleNewPass} 
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Pass</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Passes</p>
              <p className="text-xl font-bold text-gray-900">{passesData?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">
                {passesData ? new Set(passesData.map(p => p.category)).size : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Price</p>
              <p className="text-xl font-bold text-gray-900">
                ₹{passesData?.length > 0 
                  ? Math.round(passesData.reduce((sum, p) => sum + (parseFloat(p.final_price) || 0), 0) / passesData.length) 
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <CustomizableTable
          data={formatPassData(passesData)}
          allColumns={passesColumns}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default PassTable;

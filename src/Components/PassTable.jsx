// components/PassTable.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomizeableTable from '../Components/CustomizableTable';
import { useGetAllPassesForSubeventQuery } from '../features/passTable/PassTableApi';
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

const PassTable = () => {
  const { eventId, subEventId } = useParams(); // Get both eventId and subEventId from URL params
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPasses, setSelectedPasses] = useState([]);
  
  // Fetch passes data
  const { data, error, isLoading, refetch } = useGetAllPassesForSubeventQuery(subEventId);

  // Pass table columns
  const passesColumns = [
    { key: "pass_id", label: "Pass ID" },
    { key: "category", label: "Category" },
    { key: "total_price", label: "Unit Price" },  
    { key: "discount_percentage", label: "Discount %" },
    { key: "final_price", label: "Final Price" },
  ];

 const passes = React.useMemo(() => {
  console.log('Processing passes data:', data);
  
  if (!data) {
    console.log('No data received');
    return [];
  }
  
  // ✅ FIXED: Handle your specific backend response structure
  let extractedPasses = [];
  
  if (Array.isArray(data)) {
    extractedPasses = data;
  } else if (Array.isArray(data.data)) {
    extractedPasses = data.data;
  } else if (Array.isArray(data.passes)) {
    extractedPasses = data.passes;
  } else if (data.message && Array.isArray(data.message.passes)) {
    // ✅ This handles your specific case
    extractedPasses = data.message.passes;
  } else if (data.success && data.message && Array.isArray(data.message.passes)) {
    // ✅ Double check for your response structure
    extractedPasses = data.message.passes;
  } else {
    console.log('Unexpected data structure:', data);
    extractedPasses = [];
  }
  
  console.log('Extracted passes:', extractedPasses);
  console.log('Number of passes:', extractedPasses.length);
  
  return extractedPasses;
}, [data]);

  // Filter passes based on search term
  const filteredPasses = passes.filter(pass =>
    pass.pass_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pass.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pass.total_price?.toString().includes(searchTerm) ||
    pass.final_price?.toString().includes(searchTerm)
  );

  // Format data for display
  const formatPassData = (passes) => {
    return passes.map(pass => ({
      ...pass,
      total_price: pass.total_price ? `₹${pass.total_price}` : 'N/A',
      final_price: pass.final_price ? `₹${pass.final_price}` : 'N/A',
      discount_percentage: pass.discount_percentage ? `${pass.discount_percentage}%` : '0%',
    }));
  };

  // ✅ Navigation handlers
  const handleCreatePass = () => {
    // Navigate to create pass form
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/create`);
  };

  // Action handlers
  const handleView = (pass) => {
    console.log('View pass:', pass);
    // Navigate to pass detail page
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/${pass.pass_id}`);
  };

  const handleEdit = (pass) => {
    console.log('Edit pass:', pass);
    // Navigate to pass edit page
    navigate(`/events/${eventId}/subevents/${subEventId}/passes/${pass.pass_id}/edit`);
  };

  const handleDelete = (pass) => {
    console.log('Delete pass:', pass);
    // Add delete confirmation and API call
    if (window.confirm(`Are you sure you want to delete pass ${pass.pass_id}?`)) {
      // Call delete API when you add mutations
    }
  };

  // Row actions for the table
  const getRowActions = (pass) => [
    {
      icon: <Eye className="w-4 h-4" />,
      label: 'View Details',
      onClick: () => handleView(pass),
      className: 'text-blue-600 hover:bg-blue-50'
    },
    {
      icon: <Edit className="w-4 h-4" />,
      label: 'Edit Pass',
      onClick: () => handleEdit(pass),
      className: 'text-green-600 hover:bg-green-50'
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      label: 'Delete Pass',
      onClick: () => handleDelete(pass),
      className: 'text-red-600 hover:bg-red-50'
    }
  ];

  // Handle loading state
 if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading passes...</p>
        <p className="text-xs text-gray-500 mt-2">SubEvent ID: {subEventId}</p>
      </div>
    </div>
  );
}

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <MoreVertical className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Passes
          </h3>
          <p className="text-red-600 mb-4">
            {error?.data?.message || error?.message || 'Failed to fetch passes. Please try again.'}
          </p>
          <button 
            onClick={() => refetch()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (passes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pass Management</h2>
            <p className="text-sm text-gray-600 mt-1">No passes found for this sub-event</p>
          </div>
          <button 
            onClick={handleCreatePass}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pass</span>
          </button>
        </div>
        
        {/* Empty state */}
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MoreVertical className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Passes Yet</h3>
            <p className="text-gray-600 mb-4">Create your first pass to get started</p>
            <button 
              onClick={handleCreatePass}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Create Pass
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pass Management</h2>
          <p className="text-gray-600 mt-1">
            {filteredPasses.length} passes found for this sub-event
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={handleCreatePass}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pass</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search passes by ID, category, or price..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Passes</p>
              <p className="text-xl font-bold text-gray-900">{passes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">
                {new Set(passes.map(p => p.category)).size}
              </p>
            </div>
          </div>
        </div>

      
      </div>

      {/* Customizable Table */}
      <CustomizeableTable
        columns={passesColumns}
        data={formatPassData(filteredPasses)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedItems={selectedPasses}
        onSelectionChange={setSelectedPasses}
        getRowActions={getRowActions}
        emptyStateMessage="No passes match your search criteria"
        className="bg-white rounded-lg shadow-sm"
      />
    </div>
  );
};

export default PassTable;

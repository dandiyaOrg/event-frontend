// components/PassTable.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomizableTable from '../Components/CustomizableTable';
import { Plus } from 'lucide-react';

const passesColumns = [
 
  { key: "category", label: "Category" },
  { key: "total_price", label: "Unit Price" },
  { key: "discount_percentage", label: "Discount %" },
  { key: "final_price", label: "Final Price" },
];

const GlobalPassTable = (data) => {
  const { eventId, subEventId } = useParams();
  const navigate = useNavigate();

  console.log("Passes Data:", data);

  // Extract passes data from your API response structure
  const passesData = data.data;

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

  return (
    <div className="px-8 min-h-screen bg-gray-50">
    
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

export default GlobalPassTable;

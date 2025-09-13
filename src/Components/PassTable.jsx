import React, { useState } from "react";
import CustomizableTable from "./CustomizableTable";
import CreateNewPass from "./CreateNewPass";

const initialPassesData = [
  {
    id: 1,
    name: "VIP Pass",
    category: "Premium",
    unitPrice: 1500,
    discountPercent: 10,
    finalPrice: 1350,
    passesSold: 120,
    description: "Premium access with exclusive benefits",
    maxCapacity: 200,
    benefits: "Priority seating, Free refreshments, Meet & greet"
  },
  {
    id: 2,
    name: "Regular Pass",
    category: "Standard",
    unitPrice: 800,
    discountPercent: 5,
    finalPrice: 760,
    passesSold: 340,
    description: "Standard access to all event areas",
    maxCapacity: 500,
    benefits: "General admission, Standard seating"
  },
];

const passesColumns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "discountPercent", label: "Discount %" },
  { key: "finalPrice", label: "Final Price" },
  { key: "passesSold", label: "Passes Sold" },
];

const PassTable = () => {
  const [passesData, setPassesData] = useState(initialPassesData);
  const [selectedPass, setSelectedPass] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPass, setEditingPass] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passToDelete, setPassToDelete] = useState(null);

  // Handler to open detail popup
  const handleRowClick = (rowData) => {
    console.log("Row click handler called with:", rowData);
    setSelectedPass(rowData);
  };

  // Handler to hide detail popup
  const closeDetailModal = () => {
    setSelectedPass(null);
  };

  // Handler to open create pass modal
  const handleCreateNewPass = () => {
    setShowCreateModal(true);
  };

  // Handler to close create pass modal
  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  // Handler to add new pass
  const handleAddNewPass = (newPass) => {
    const passWithId = {
      ...newPass,
      id: Math.max(...passesData.map(p => p.id), 0) + 1
    };
    setPassesData(prevPasses => [...prevPasses, passWithId]);
    console.log("New pass created:", passWithId);
  };

  // Handler for edit button
  const handleEdit = (pass) => {
    setEditingPass(pass);
    setShowEditModal(true);
  };

  // Handler to close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingPass(null);
  };

  // Handler to update pass
  const handleUpdatePass = (updatedPass) => {
    setPassesData(prevPasses => 
      prevPasses.map(pass => 
        pass.id === updatedPass.id ? updatedPass : pass
      )
    );
    console.log("Pass updated:", updatedPass);
  };

  // Handler for delete button
  const handleDelete = (pass) => {
    setPassToDelete(pass);
    setShowDeleteConfirm(true);
  };

  // Handler to confirm delete
  const confirmDelete = () => {
    setPassesData(prevPasses => 
      prevPasses.filter(pass => pass.id !== passToDelete.id)
    );
    setShowDeleteConfirm(false);
    setPassToDelete(null);
    console.log("Pass deleted:", passToDelete);
  };

  // Handler to cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPassToDelete(null);
  };

  return (
    <div>
      <CustomizableTable
        data={passesData}
        allColumns={passesColumns}
        rowsPerPageOptions={[5, 10, 25]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add New Pass Button */}
      <div className="flex justify-center items-center">
        <button 
          onClick={handleCreateNewPass}
          className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all"
        >
          + Add New Pass
        </button>
      </div>

      {/* Pass Detail Popup */}
      {selectedPass && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeDetailModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedPass.name} Details</h2>
            <div className="space-y-3">
              <p><strong>Category:</strong> {selectedPass.category}</p>
              <p><strong>Unit Price:</strong> ₹{selectedPass.unitPrice}</p>
              <p><strong>Discount %:</strong> {selectedPass.discountPercent}%</p>
              <p><strong>Final Price:</strong> ₹{selectedPass.finalPrice}</p>
              <p><strong>Passes Sold:</strong> {selectedPass.passesSold}</p>
              {selectedPass.maxCapacity && (
                <p><strong>Max Capacity:</strong> {selectedPass.maxCapacity}</p>
              )}
              {selectedPass.description && (
                <p><strong>Description:</strong> {selectedPass.description}</p>
              )}
              {selectedPass.benefits && (
                <p><strong>Benefits:</strong> {selectedPass.benefits}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create New Pass Modal */}
      <CreateNewPass
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        onSubmit={handleAddNewPass}
      />

      {/* Edit Pass Modal */}
      <CreateNewPass
        isOpen={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleUpdatePass}
        editMode={true}
        initialData={editingPass}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{passToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassTable;

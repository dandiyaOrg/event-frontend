import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";
import CreateNewEmployee from "../Components/CreateNewEmployee";

const initialEmployeeData = [
  {
    id: 1,
    name: "Ravi Mehra",
    username: "ravi.mehra",
    mobileNumber: "+91 8884442211",
    emailId: "ravi.mehra@company.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Anjali Kulkarni",
    username: "anjali.k",
    mobileNumber: "+91 9023445566",
    emailId: "anjali.kulkarni@company.com",
    password: "securepass456",
  },
  {
    id: 3,
    name: "Deepak Singh",
    username: "deepak.singh",
    mobileNumber: "+91 9811122233",
    emailId: "deepak.singh@company.com",
    password: "mypassword789",
  },
  {
    id: 4,
    name: "Kavita Sethi",
    username: "kavita.s",
    mobileNumber: "+91 9430111122",
    emailId: "kavita.sethi@company.com",
    password: "strongpass321",
  },
];

const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "emailId", label: "Email Id" },
  { key: "password", label: "Password" },
];

const EmployeePage = () => {
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Debug logs to see what's happening
  console.log("EmployeePage render:", { showCreateModal, editingEmployee });

  const handleAddEmployee = () => {
    console.log("Add employee button clicked - setting modal to true");
    setEditingEmployee(null); // Clear any editing state
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowCreateModal(false);
    setEditingEmployee(null);
  };

  const handleSubmitEmployee = (employeeInfo) => {
    console.log("Submit employee:", employeeInfo);
    
    if (editingEmployee) {
      // Update existing employee
      setEmployeeData(prevData =>
        prevData.map(emp =>
          emp.id === editingEmployee.id ? { ...employeeInfo, id: editingEmployee.id } : emp
        )
      );
      console.log("Employee updated");
    } else {
      // Add new employee
      setEmployeeData(prevData => [...prevData, employeeInfo]);
      console.log("New employee added");
    }
  };

  const handleEditEmployee = (employee) => {
    console.log("Edit employee clicked:", employee);
    setEditingEmployee(employee);
    setShowCreateModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    console.log("Delete employee clicked:", employee);
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setEmployeeData(prevData => prevData.filter(emp => emp.id !== employee.id));
      console.log("Employee deleted");
    }
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Employees
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your team members - Modal State: {showCreateModal ? 'OPEN' : 'CLOSED'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar 
          placeholder="Search employees..." 
          className="w-60" 
        />
        <button
          className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
          onClick={handleAddEmployee}
        >
          + New Employee
        </button>
      </div>

      

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <CustomizableTable
          data={employeeData}
          allColumns={employeeColumns}
          rowsPerPageOptions={[5, 10, 25]}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      </div>

      {/* Create/Edit Employee Modal */}
      {console.log("Rendering CreateNewEmployee with props:", { isOpen: showCreateModal, editingEmployee })}
      <CreateNewEmployee
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEmployee}
        editingEmployee={editingEmployee}
      />

     
    </div>
  );
};

export default EmployeePage;
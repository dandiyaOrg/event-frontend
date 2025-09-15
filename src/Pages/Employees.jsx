import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";
import CreateNewEmployee from "../Components/CreateNewEmployee";
import EmployeeCard from "../Components/EmployeeCard"; // New component for employee details
import mockData from '../Data/MockData.json';


const { employeesData } = mockData;


const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "emailId", label: "Email Id" },
  { key: "password", label: "Password" },
];

const EmployeePage = () => {
  const [employeeData, setEmployeeData] = useState(employeesData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmployeeCard, setShowEmployeeCard] = useState(false); // New state for card
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // New state for selected employee

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingEmployee(null);
  };

  const handleSubmitEmployee = (employeeInfo) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployeeData(prevData =>
        prevData.map(emp =>
          emp.id === editingEmployee.id ? { ...employeeInfo, id: editingEmployee.id } : emp
        )
      );
    } else {
      // Add new employee
      setEmployeeData(prevData => [...prevData, employeeInfo]);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowCreateModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setEmployeeData(prevData => prevData.filter(emp => emp.id !== employee.id));
    }
  };

  // New function to handle row click and show employee card
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeCard(true);
  };

  // New function to close employee card
  const handleCloseEmployeeCard = () => {
    setShowEmployeeCard(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Employees
        </h1>
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
          onRowClick={handleRowClick}
        />
      </div>

      {/* Create/Edit Employee Modal */}
      <CreateNewEmployee
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEmployee}
        editingEmployee={editingEmployee}
      />

      {/* Employee Details Card - Using your separate component */}
      <EmployeeCard
        isOpen={showEmployeeCard}
        onClose={handleCloseEmployeeCard}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeePage;

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";
import { useGetEmployeesQuery } from "../features/employee/employeeApi"

const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "mobile_no", label: "Mobile Number" },
  { key: "email", label: "Email Id" },
  { key: "password", label: "Password" },
];

const EmployeePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data } = useGetEmployeesQuery(page);

  console.log("Employees Data:", data);

  const employeesData = data?.data?.employees;

  // Navigate to add employee page
  const handleNewEmployee = () => {
    navigate('/employees/new');
  };

  // Navigate to employee details page
  const handleRowClick = (employee) => {
    navigate(`/employees/${employee.employee_id}`, { state: { employee } });
  };

  // Filter employees based on search term
  // const filteredEmployees = employeesData.filter(employee =>
  //   employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   employee.emailId.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
          value={searchTerm}
          onChange={setSearchTerm}  // Callback when value changes
        />
        <button 
          onClick={handleNewEmployee} 
          className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
        >
          + New Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <CustomizableTable
          data={employeesData}
          allColumns={employeeColumns}
          onRowClick={handleRowClick}  
        />
      </div>
    </div>
  );
};

export default EmployeePage;

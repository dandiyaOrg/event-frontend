import React from 'react';
import EmployeeCard from '../Components/EmployeeCard';
import employees from '../Data/Employees.json';

function Employees() {
  const handleAddEmployee = () => {
    // Logic to open modal or navigate to add employee page
    alert('Add New Employee clicked!');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-[1280px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <button
          onClick={handleAddEmployee}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition w-full md:w-auto"
        >
          Add New Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            image={employee.image}
            name={employee.name}
            role={employee.role}
            email={employee.email}
            mobile={employee.mobile}
            description={employee.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Employees;

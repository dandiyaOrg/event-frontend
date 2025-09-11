import employees from "../Data/Employees.json";
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";

const employeeData = [
  {
    id: 1,
    name: "Ravi Mehra",
    username: "ravi.mehra",
    mobileNumber: "+91 8884442211",
    emailId: "ravi.mehra@company.com",
    password: "********",
   
  },
  {
    id: 2,
    name: "Anjali Kulkarni",
    username: "anjali.k",
    mobileNumber: "+91 9023445566",
    emailId: "anjali.kulkarni@company.com",
    password: "********",
   
  },
  {
    id: 3,
    name: "Deepak Singh",
    username: "deepak.singh",
    mobileNumber: "+91 9811122233",
    emailId: "deepak.singh@company.com",
    password: "********",
    
  },
  {
    id: 4,
    name: "Kavita Sethi",
    username: "kavita.s",
    mobileNumber: "+91 9430111122",
    emailId: "kavita.sethi@company.com",
    password: "********",
    
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
  const handleAddEmployee = () => {
    console.log("Add Employee button clicked");
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
        <SearchBar placeholder="Search events..." className="w-60" />
        <button
          className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
          onClick={handleAddEmployee}
        >
          + New Employee
        </button>
      </div>

      {/* Table */}

     
          <CustomizableTable
            data={employeeData}
            allColumns={employeeColumns}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
     
  );
};

export default EmployeePage;

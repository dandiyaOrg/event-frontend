import CustomizableTable from "../Components/CustomizableTable"
import SearchBar from "../Components/SearchBar"

const billingUserData = [
  {
    id: 1,
    name: "Amit Verma",
    mobileNumber: "+91 9876543210",
    email: "amit.verma@example.com",
    gender: "Male",
  },
  {
    id: 2,
    name: "Sunita Sharma",
    mobileNumber: "+91 9123456789",
    email: "sunita.sharma@example.com",
    gender: "Female",
  },
  {
    id: 3,
    name: "Rohit Kumar",
    mobileNumber: "+91 9988776655",
    email: "rohit.kumar@example.com",
    gender: "Male",
  },
  {
    id: 4,
    name: "Anjali Jain",
    mobileNumber: "+91 8899776655",
    email: "anjali.jain@example.com",
    gender: "Female",
  },
];


const billingUserColumns = [
  { key: "name", label: "Name" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "email", label: "Email" },
  { key: "gender", label: "Gender" },
  
];


const BillingUser = () => {
  return (
<div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Billing Users
        </h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search events..." className="w-60" />
        
      </div>

      {/* Table */}

     
          <CustomizableTable
            data={billingUserData}
            allColumns={billingUserColumns}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
  )
}

export default BillingUser

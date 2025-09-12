import SearchBar from "../Components/SearchBar"
import CustomizableTable from "../Components/CustomizableTable"; 

const orderData = [
  {
    id: 1,
    orderNumber: "ORD20251001",
    status: "Success",
    trxnNumber: "TXN2025001",
    billingUser: "Amit Verma",
  },
  {
    id: 2,
    orderNumber: "ORD20251002",
    status: "Pending",
    trxnNumber: "TXN2025003",
    billingUser: "Sunita Sharma",
  },
  {
    id: 3,
    orderNumber: "ORD20251003",
    status: "Cancelled",
    trxnNumber: "TXN2025002",
    billingUser: "Rohit Kumar",
  },
  {
    id: 4,
    orderNumber: "ORD20251004",
    status: "Pending",
    trxnNumber: "TXN2025005",
    billingUser: "Anjali Jain",
  },
];


const orderColumns = [
  { key: "orderNumber", label: "Order Number" },
  { key: "status", label: "Status" },
  { key: "trxnNumber", label: "Trxn Number" },
  { key: "billingUser", label: "Billing User" },
  
];


const Orders = () => {
  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Orders
        </h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search events..." className="w-60" />
        
      </div>

      {/* Table */}

     
          <CustomizableTable
            data={orderData}
            allColumns={orderColumns}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
  )
}

export default Orders

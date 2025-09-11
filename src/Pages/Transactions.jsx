import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable"; // Adjust the path as needed

const transactionData = [
  {
    id: 1,
    trxnNumber: "TXN2025001",
    amount: 1250,
    dateTime: "2025-09-10 10:45",
    status: "Success",
    srcOfPayment: "Credit Card",
  },
  {
    id: 2,
    trxnNumber: "TXN2025002",
    amount: 800,
    dateTime: "2025-09-10 11:10",
    status: "Pending",
    srcOfPayment: "UPI",
  },
  {
    id: 3,
    trxnNumber: "TXN2025003",
    amount: 1420,
    dateTime: "2025-09-10 12:30",
    status: "Failed",
    srcOfPayment: "Bank Transfer",
  },
  {
    id: 4,
    trxnNumber: "TXN2025004",
    amount: 1950,
    dateTime: "2025-09-11 09:05",
    status: "Success",
    srcOfPayment: "Debit Card",
  },
];



const transactionColumns = [
  { key: "trxnNumber", label: "Trxn Number" },
  { key: "amount", label: "Amount" },
  { key: "dateTime", label: "Date Time" },
  { key: "status", label: "Status" },
  { key: "srcOfPayment", label: "Src of Payment" },
  { key: "actions", label: "Actions" },
];







const TransactionTablePage = () => {
  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Attendee
        </h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search events..." className="w-60" />
        
      </div>

      {/* Table */}

     
          <CustomizableTable
            data={transactionData}
            allColumns={transactionColumns}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
  );
};

export default TransactionTablePage;

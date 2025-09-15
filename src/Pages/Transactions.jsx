import React, { useState } from "react";
import SearchBar from "../Component/SearchBar";
import CustomizableTable from "../Component/CustomizableTable";

const transactionData = [
  {
    id: 1,
    trxnNumber: "TXN2025001",
    amount: 1250,
    dateTime: "2025-09-10 10:45",
    status: "Success",
    srcOfPayment: "Credit Card",
    recipientName: "John Doe",
    recipientEmail: "john.doe@example.com",
    description: "Event registration fee",
    transactionFee: 25,
    netAmount: 1225,
    refNumber: "REF123456789",
    bankName: "HDFC Bank"
  },
  {
    id: 2,
    trxnNumber: "TXN2025002", 
    amount: 800,
    dateTime: "2025-09-10 11:10",
    status: "Pending",
    srcOfPayment: "UPI",
    recipientName: "Jane Smith",
    recipientEmail: "jane.smith@example.com",
    description: "VIP pass purchase",
    transactionFee: 15,
    netAmount: 785,
    refNumber: "REF987654321",
    bankName: "SBI"
  },
  {
    id: 3,
    trxnNumber: "TXN2025003",
    amount: 1420,
    dateTime: "2025-09-10 12:30",
    status: "Failed",
    srcOfPayment: "Bank Transfer",
    recipientName: "Mike Johnson",
    recipientEmail: "mike.johnson@example.com",
    description: "Premium event access",
    transactionFee: 30,
    netAmount: 1390,
    refNumber: "REF456789123",
    bankName: "ICICI Bank"
  },
  {
    id: 4,
    trxnNumber: "TXN2025004",
    amount: 1950,
    dateTime: "2025-09-11 09:05",
    status: "Success",
    srcOfPayment: "Debit Card",
    recipientName: "Sarah Wilson",
    recipientEmail: "sarah.wilson@example.com",
    description: "Group booking",
    transactionFee: 40,
    netAmount: 1910,
    refNumber: "REF789123456",
    bankName: "Axis Bank"
  },
];

const transactionColumns = [
  { key: "trxnNumber", label: "Trxn Number" },
  { key: "amount", label: "Amount" },
  { key: "dateTime", label: "Date Time" },
  { key: "status", label: "Status" },
  { key: "srcOfPayment", label: "Src of Payment" },
];

const TransactionTablePage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Handler for row click
  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Handler to close modal
  const closeModal = () => {
    setSelectedTransaction(null);
  };

  // Status color helper
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Transactions
        </h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search transactions..." className="w-60" />
      </div>

      {/* Table */}
      <CustomizableTable
        data={transactionData}
        allColumns={transactionColumns}
        rowsPerPageOptions={[5, 10, 25]}
        onRowClick={handleRowClick}
      />

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            {/* Modal Header */}
            <div className="bg-gray-800 px-6 py-4 rounded-t-2xl border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-2xl font-bold p-1"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Transaction ID and Status */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedTransaction.trxnNumber}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedTransaction.dateTime}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status}
                </span>
              </div>

              {/* Amount Section */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gray-900">₹{selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Amount</p>
                    <p className="text-xl font-semibold text-green-700">₹{selectedTransaction.netAmount?.toLocaleString()}</p>
                  </div>
                </div>
                {selectedTransaction.transactionFee && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Transaction Fee: <span className="text-red-600 font-medium">₹{selectedTransaction.transactionFee}</span></p>
                  </div>
                )}
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Payment Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="text-gray-800 font-medium">{selectedTransaction.srcOfPayment}</p>
                    </div>
                    {selectedTransaction.bankName && (
                      <div>
                        <p className="text-sm text-gray-600">Bank</p>
                        <p className="text-gray-800 font-medium">{selectedTransaction.bankName}</p>
                      </div>
                    )}
                    {selectedTransaction.refNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Reference Number</p>
                        <p className="text-gray-800 font-medium font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedTransaction.refNumber}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Recipient Details</h4>
                  <div className="space-y-3">
                    {selectedTransaction.recipientName && (
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="text-gray-800 font-medium">{selectedTransaction.recipientName}</p>
                      </div>
                    )}
                    {selectedTransaction.recipientEmail && (
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-gray-800 font-medium">{selectedTransaction.recipientEmail}</p>
                      </div>
                    )}
                    {selectedTransaction.description && (
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-gray-800 font-medium">{selectedTransaction.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-300">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTablePage;

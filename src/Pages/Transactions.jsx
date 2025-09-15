import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";
import mockData from "../Data/MockData.json";
import { useNavigate } from "react-router-dom";

const { transactionData } = mockData;

const transactionColumns = [
  { key: "trxnNumber", label: "Trxn Number" },
  { key: "amount", label: "Amount" },
  { key: "dateTime", label: "Date Time" },
  { key: "status", label: "Status" },
  { key: "srcOfPayment", label: "Src of Payment" },
];

const TransactionTablePage = () => {
  const navigate = useNavigate();

  // Handler for row click
  const handleRowClick = (transaction) => {
    navigate(`/transactions/${transaction.id}`, {
      state: { transaction },
    });
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Transactions
        </h1>
      </div>

      {/* Table */}
      <CustomizableTable
        data={transactionData}
        allColumns={transactionColumns}
        rowsPerPageOptions={[5, 10, 25]}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default TransactionTablePage;

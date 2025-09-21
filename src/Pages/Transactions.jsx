import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import CustomizableTable from "../Components/CustomizableTable";
import ErrorPopup from "../Components/ErrorPopup";
import mockData from "../Data/MockData.json";
import { useNavigate } from "react-router-dom";

import { useGetTransactionsForAdminQuery } from '../features/transaction/TransactionApi';

const transactionColumns = [
  { key: "transaction_id", label: "Trxn Number" },
  { key: "amount", label: "Amount" },
  { key: "datetime", label: "Date Time" },
  { key: "status", label: "Status" },
  { key: "source_of_payment", label: "Src of Payment" },
];

const TransactionTablePage = () => {
  const navigate = useNavigate();
  const { 
    data,  
    isError, 
    error 
  } = useGetTransactionsForAdminQuery();

    const TransactionData = data?.data?.transactions;

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
        data={TransactionData || []} // Fallback to empty array if no data
        allColumns={transactionColumns}
        rowsPerPageOptions={[5, 10, 25]}
        onRowClick={handleRowClick}
      />

      {/* Error Popup - Only shows when isError is true */}
      <ErrorPopup 
        isError={isError} 
        error={error} 
      />
    </div>
  );
};

export default TransactionTablePage;

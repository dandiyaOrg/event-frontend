import React from "react";

const transactions = [
  // Example static data. Replace with props or API data.
  {
    transaction_id: "T202309081",
    amount: 299.99,
    datetime: "2025-09-08 14:20",
    source_of_payment: "Website",
    status: "success",
    method_of_payment: "UPI",
    razorpay_order_id: "order_LRlApA1234",
    razorpay_signature: "5b27892e1...",
    razorpay_paymentid: "pay_LRlBz1Xy56",
  },
  {
    transaction_id: "T202309082",
    amount: 99.99,
    datetime: "2025-09-07 20:44",
    source_of_payment: "MobileApp",
    status: "failure",
    method_of_payment: "Credit Card",
    razorpay_order_id: "order_LRabcB5678",
    razorpay_signature: "b2ff7aad9...",
    razorpay_paymentid: "pay_LRlm8klYo3",
  },
  // Add more as needed
];

const statusColors = {
  refund: "bg-gray-200 text-gray-600",
  success: "bg-green-100 text-green-700",
  failure: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const Transactions = () => (
  <div className="overflow-x-auto rounded-xl shadow bg-gray-50 p-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Transactions</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Transaction ID</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Amount</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Datetime</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Source</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Payment Method</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Signature</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Payment ID</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {transactions.map((txn, idx) => (
          <tr key={txn.transaction_id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-gray-700">{txn.transaction_id}</td>
            <td className="px-4 py-2 text-gray-800 font-medium">₹{txn.amount.toFixed(2)}</td>
            <td className="px-4 py-2 text-gray-500">{txn.datetime}</td>
            <td className="px-4 py-2 text-gray-700">{txn.source_of_payment}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 text-xs rounded ${statusColors[txn.status] || "bg-gray-200 text-gray-600"}`}>
                {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
              </span>
            </td>
            <td className="px-4 py-2 text-gray-700">{txn.method_of_payment}</td>
            <td className="px-4 py-2 text-gray-400 font-mono">{txn.razorpay_order_id}</td>
            <td className="px-4 py-2 text-gray-400 font-mono">{txn.razorpay_signature}</td>
            <td className="px-4 py-2 text-gray-400 font-mono">{txn.razorpay_paymentid}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Transactions;

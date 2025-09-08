import React from "react";
import { useSelector } from "react-redux";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import transactions from "../Data/Transactions.json";

export default function TransactionTable() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        width: "100%",
        overflowX: "auto",
        bgcolor: darkMode ? "#212529" : "#fff",
      }}
    >
      <Table sx={{ minWidth: 900, tableLayout: "fixed" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: darkMode ? "#343a40" : "#f8f9fa" }}>
            {[
              "Transaction ID",
              "Amount",
              "Date & Time",
              "Source of Payment",
              "Status",
              "Method of Payment",
              "Razorpay Order ID",
              "Razorpay Payment ID",
              "Action",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{ fontWeight: "bold", color: darkMode ? "#adb5bd" : "#495057" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
  {transactions.map((txn) => (
    <TableRow key={txn.transaction_id} sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.transaction_id}</TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.amount.toFixed(2)}</TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.datetime}</TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.source_of_payment}</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            background: txn.status === "success" ? "#e6f4ea" : "#f8d7da",
            color: txn.status === "success" ? "#2e665d" : "#842029",
            borderRadius: "6px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {txn.status}
        </Box>
      </TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.method_of_payment}</TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.razorpay_order_id}</TableCell>
      <TableCell sx={{ color: darkMode ? "#f1f3f5" : "#212529" }}>{txn.razorpay_paymentid}</TableCell>
      <TableCell>
        <IconButton color="primary" size="small" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton color="success" size="small" aria-label="view">
          <VisibilityIcon />
        </IconButton>
        <IconButton color="error" size="small" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </Box>
  );
}

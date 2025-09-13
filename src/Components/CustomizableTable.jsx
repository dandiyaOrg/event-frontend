import React, { useState, useEffect, useRef } from "react";
import { Edit, Trash2 } from "lucide-react";

import {
  ChevronDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const CustomizableTable = ({
  data,
  initialColumns,
  allColumns = [],
  rowsPerPageOptions = [10, 25, 50, 100],
  onRowClick,
  onEdit,  // Add this
  onDelete // Add this
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(initialColumns || allColumns.map((c) => c.key))
  );
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Use provided data or fallback to empty array if no data
  const useData = data && data.length ? data : [];

  const totalPages = Math.ceil(useData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = useData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnDropdown(false);
      }
    };

    if (showColumnDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColumnDropdown]);

  const handleRowSelect = (id, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleColumn = (columnKey) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(columnKey)) {
      newVisible.delete(columnKey);
    } else {
      newVisible.add(columnKey);
    }
    setVisibleColumns(newVisible);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-600";
      case "Pending":
        return "bg-orange-300";
      default:
        return "bg-red-600";
    }
  };

  const handleEdit = (row, e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(row);
    } else {
      // Fallback alert if no onEdit prop provided
      alert(`Edit row id: ${row.id}`);
    }
  };

  const handleDelete = (row, e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(row);
    } else {
      // Fallback alert if no onDelete prop provided
      alert(`Delete row id: ${row.id}`);
    }
  };

  const handleRowClick = (row) => {
    console.log("Table row clicked:", row);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const renderCellContent = (column, value, row) => {
    switch (column) {
      case "status":
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(value)}`}
            ></div>
            <span>{value}</span>
          </div>
        );
      case "reviewer":
        return value === "Assign reviewer" ? (
          <select 
            className="bg-transparent border border-gray-600 rounded px-2 py-1 text-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => e.stopPropagation()}
          >
            <option>Assign reviewer</option>
            <option>Eddie Lake</option>
            <option>Jamik Tashpulatov</option>
          </select>
        ) : (
          <span>{value}</span>
        );
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <div className="bg-gray-200 text-gray-100 rounded-lg overflow-hidden">
      {/* Header with Customize Columns */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="text-sm text-gray-800">
          {selectedRows.size} of {useData.length} row(s) selected.
        </div>

        <div className="relative">
          <div ref={dropdownRef}>
            <button
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-300 text-gray-700 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-gray-300 transition-colors"
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
              </div>
              Customize Columns
              <ChevronDown className="w-4 h-4" />
            </button>

            {showColumnDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10">
                <div className="p-2">
                  {allColumns.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(column.key)}
                        onChange={() => toggleColumn(column.key)}
                        className="w-4 h-4 text-gray-400 bg-gray-700 border-gray-600 rounded focus:ring-gray-500"
                      />
                      <span className="text-sm">{column.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="w-12 px-4 py-3 text-left font-medium text-gray-300">
                S.No.
              </th>

              {allColumns
                .filter((col) => visibleColumns.has(col.key))
                .map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-300"
                  >
                    {column.label}
                  </th>
                ))}
              <th className="w-28 px-4 py-3 text-left text-sm font-medium text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                onClick={() => handleRowClick(row)}
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {startIndex + index + 1}
                </td>
                {allColumns
                  .filter((col) => visibleColumns.has(col.key))
                  .map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-900"
                    >
                      {renderCellContent(column.key, row[column.key], row)}
                    </td>
                  ))}

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleEdit(row, e)}
                      className="p-1 rounded hover:bg-gray-700 text-gray-500"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(row, e)}
                      className="p-1 rounded hover:bg-gray-700 text-gray-900"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-800">Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableTable; 
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const ROWS_PER_PAGE = 25;

const CustomizableTable = ({
  data,
  initialColumns,
  allColumns = [],
  onRowClick,
}) => {
  const [visibleColumns, setVisibleColumns] = useState(
    () => new Set(initialColumns || allColumns.map((c) => c.key))
  );
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const useData = Array.isArray(data) ? data : [];

  const totalPages = Math.max(1, Math.ceil(useData.length / ROWS_PER_PAGE));
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;

  const paginatedData = useMemo(
    () => useData.slice(startIndex, startIndex + ROWS_PER_PAGE),
    [useData, startIndex]
  );

  // Clamp current page if data size changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Close dropdown when clicking outside, but ignore toggle button
  useEffect(() => {
    const handleClickOutside = (event) => {
      const inDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const inButton =
        toggleBtnRef.current && toggleBtnRef.current.contains(event.target);
      if (!inDropdown && !inButton) {
        setShowColumnDropdown(false);
      }
    };

    if (showColumnDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showColumnDropdown]);

  const toggleColumn = useCallback((columnKey) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(columnKey)) next.delete(columnKey);
      else next.add(columnKey);
      return next;
    });
  }, []);

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

  const handleRowClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  const renderCellContent = (column, value, row) => {
    switch (column) {
      case "status":
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(value)}`} />
            <span>{value}</span>
          </div>
        );
      case "reviewer":
        return value === "Assign reviewer" ? (
          <select
            className="bg-transparent border border-gray-600 rounded px-2 py-1 text-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => e.stopPropagation()}
            defaultValue="Assign reviewer"
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

  const visibleCols = useMemo(
    () => allColumns.filter((col) => visibleColumns.has(col.key)),
    [allColumns, visibleColumns]
  );

  return (
    <div className="bg-gray-200 text-gray-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="text-sm text-gray-800 font-semibold">
          Total Rows - {useData.length}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            ref={toggleBtnRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={showColumnDropdown}
            onClick={() => setShowColumnDropdown((s) => !s)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-300 text-gray-700 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-gray-300 transition-colors"
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-gray-400 rounded-sm" />
              <div className="bg-gray-400 rounded-sm" />
              <div className="bg-gray-400 rounded-sm" />
              <div className="bg-gray-400 rounded-sm" />
            </div>
            Customize Columns
            <ChevronDown className="w-4 h-4" />
          </button>

          {showColumnDropdown && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10"
            >
              <div className="p-2 max-h-72 overflow-auto">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="w-12 px-4 py-3 text-left font-medium text-gray-300">
                S.No.
              </th>
              {visibleCols.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-300"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id ?? `${startIndex + index}`}
                className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                onClick={() => handleRowClick(row)}
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {startIndex + index + 1}
                </td>
                {visibleCols.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-900"
                  >
                    {renderCellContent(column.key, row[column.key], row)}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={1 + visibleCols.length}
                  className="px-4 py-6 text-center text-sm text-gray-700"
                >
                  No rows to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center font-semibold justify-end p-4 border-t border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="p-1 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableTable;

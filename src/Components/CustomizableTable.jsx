import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles, Grid3X3 } from "lucide-react";

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
        return "bg-emerald-500 shadow-emerald-500/30";
      case "Pending":
        return "bg-orange-400 shadow-orange-400/30";
      default:
        return "bg-red-500 shadow-red-500/30";
    }
  };

  const handleRowClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  const renderCellContent = (column, value, row) => {
    switch (column) {
      case "status":
        return (
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(value)} shadow-lg animate-pulse`} />
            <span className="font-semibold text-slate-700">{value}</span>
          </div>
        );
      case "reviewer":
        return value === "Assign reviewer" ? (
          <select
            className="bg-gradient-to-r from-white to-gray-50 border-2 border-blue-200 focus:border-blue-400 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => e.stopPropagation()}
            defaultValue="Assign reviewer"
          >
            <option>Assign reviewer</option>
            <option>Eddie Lake</option>
            <option>Jamik Tashpulatov</option>
          </select>
        ) : (
          <span className="font-semibold text-slate-700">{value}</span>
        );
      default:
        return <span className="font-medium text-slate-700">{value}</span>;
    }
  };

  const visibleCols = useMemo(
    () => allColumns.filter((col) => visibleColumns.has(col.key)),
    [allColumns, visibleColumns]
  );

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/50">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center p-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 border-b border-slate-600/50">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Data Overview</h3>
            <p className="text-slate-300 font-semibold">
              Total Rows: <span className="text-blue-300 font-black">{useData.length}</span>
            </p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            ref={toggleBtnRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={showColumnDropdown}
            onClick={() => setShowColumnDropdown((s) => !s)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Customize Columns</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showColumnDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showColumnDropdown && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-4 w-80 bg-white/95 backdrop-blur-xl border-2 border-blue-200 rounded-3xl shadow-2xl z-20 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <h4 className="text-white font-black text-lg flex items-center">
                  <Grid3X3 className="w-5 h-5 mr-2" />
                  Column Settings
                </h4>
              </div>
              <div className="p-4 max-h-80 overflow-auto">
                {allColumns.map((column, index) => (
                  <label
                    key={column.key}
                    className="flex items-center gap-4 px-4 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl cursor-pointer transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(column.key)}
                        onChange={() => toggleColumn(column.key)}
                        className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 transition-all duration-300"
                      />
                      {visibleColumns.has(column.key) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors duration-300">
                      {column.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-100 via-blue-50 to-purple-50 border-b-2 border-slate-200">
            <tr>
              <th className="w-16 px-6 py-6 text-left font-black text-slate-800 uppercase tracking-wide">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-sm">S.No.</span>
                </div>
              </th>
              {visibleCols.map((column, index) => (
                <th
                  key={column.key}
                  className="px-6 py-6 text-left text-sm font-black text-slate-800 uppercase tracking-wide"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full"></div>
                    <span>{column.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id ?? `${startIndex + index}`}
                className="group bg-white/70 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-white hover:to-purple-50/80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-transparent hover:border-l-blue-500"
                onClick={() => handleRowClick(row)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-6 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <span className="text-white font-black text-xs">
                        {startIndex + index + 1}
                      </span>
                    </div>
                  </div>
                </td>
                {visibleCols.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-6 text-sm transition-all duration-300 group-hover:transform group-hover:translate-x-1"
                  >
                    <div className="flex items-center space-x-2">
                      {renderCellContent(column.key, row[column.key], row)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={1 + visibleCols.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-600 mb-2">No data available</h3>
                      <p className="text-gray-500 font-medium">There are currently no rows to display</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enhanced Footer */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 via-blue-50/50 to-purple-50/50 border-t-2 border-slate-200/50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/30"></div>
            <span className="text-sm font-bold text-slate-700">Live Data</span>
          </div>
          <div className="h-6 w-px bg-slate-300"></div>
          <span className="text-sm font-semibold text-slate-600">
            Showing {startIndex + 1}-{Math.min(startIndex + ROWS_PER_PAGE, useData.length)} of {useData.length} entries
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-slate-700 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-xl">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="group p-3 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="group p-3 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableTable;

// components/PassDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useGetPassByIdQuery,
  useTogglePassStatusMutation,
  useUpdatePassMutation, // Add this mutation
} from "../features/passTable/PassTableApi";
import {
  ArrowLeft,
  Tag,
  Percent,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  Activity,
  CreditCard,
  TrendingUp,
  IndianRupee,
  Power,
  Edit3,
} from "lucide-react";
import PricingEditModal from "../components/PricingEditModal";

const PassDetail = () => {
  const { eventId, subEventId, passId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for optimistic UI updates and modal
  const [localPassData, setLocalPassData] = useState(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Get pass data from location state or API
  const passFromState = location.state?.pass;
  const { data, error, isLoading, refetch } = useGetPassByIdQuery(passId, {
    skip: !!passFromState, // Skip API call if we have data from state
  });

  const [togglePassStatus, { isLoading: isToggling }] =
    useTogglePassStatusMutation();
  const [updatePassPricing, { isLoading: isUpdatingPricing }] =
    useUpdatePassMutation(); // Add this mutation hook

  // Use local state if available, otherwise use API data or state data
  const pass = localPassData || passFromState || data?.data || data;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-ping mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Loading Pass Details
          </h3>
          <p className="text-slate-600">Fetching pass information...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !pass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Pass Not Found
          </h3>
          <p className="text-red-600 mb-6">
            {error?.data?.message ||
              "Could not load pass details. Please try again."}
          </p>
          <button
            onClick={() =>
              navigate(`/events/${eventId}/subevents/${subEventId}/passes`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Back to Passes
          </button>
        </div>
      </div>
    );
  }

  const handleToggleStatus = async () => {
    try {
      // Optimistic update - immediately update UI
      setLocalPassData({
        ...pass,
        is_active: !pass.is_active,
      });

      // Call the API with proper error handling
      const result = await togglePassStatus(pass.pass_id).unwrap();

      // Show success message from server
      alert(
        result.message ||
          `Pass ${
            result.data.is_active ? "activated" : "deactivated"
          } successfully!`
      );

      // Refetch to ensure data consistency
      if (refetch) {
        refetch();
      }
    } catch (err) {
      console.error("Failed to toggle pass status:", err);

      // Revert optimistic update on error
      setLocalPassData(null);

      // Handle different error types
      if (err.status === 404) {
        alert(
          "Pass not found or toggle endpoint not available. Please check the pass ID."
        );
      } else if (err.status === "PARSING_ERROR") {
        alert(
          "Server error: Unable to process the request. Please try again later."
        );
      } else {
        alert(
          err?.data?.message ||
            "Failed to update pass status. Please try again."
        );
      }
    }
  };

  const handleUpdatePricing = async (pricingData) => {
    try {
      const passData = {
        total_price: pricingData.total_price,
        discount_percentage: pricingData.discount_percentage,
      };
      const result = await updatePassPricing({
        passId: pass.pass_id,
        passData,
      }).unwrap();

      // Update local state with new pricing data
      setLocalPassData({
        ...pass,
        total_price: pricingData.total_price,
        discount_percentage: pricingData.discount_percentage,
        final_price:
          pricingData.total_price -
          (pricingData.total_price * pricingData.discount_percentage) / 100,
      });

      alert("Pricing updated successfully!");
      setIsPricingModalOpen(false);
    } catch (error) {
      console.error("Failed to update pricing:", error);
      throw error; // Re-throw to let the modal handle it
    }
  };
  const handleBack = () => {
    navigate(`/events/${eventId}/subevents/${subEventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group px-4 py-3 rounded-xl hover:bg-white/50 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-semibold">Back to Pass Management</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Tag className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {pass.category} Pass
                  </h1>
                  <p className="text-blue-100 text-lg font-semibold mt-2 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Pass ID: {pass.pass_id}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-lg shadow-xl ${
                    pass.is_active
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {pass.is_active ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span>{pass.is_active ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pass Information Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Pass Information
                    </h3>
                    <p className="text-slate-300 font-medium">
                      Complete pass details and pricing
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                          Category
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {pass.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="group relative">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                        <IndianRupee className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                          Original Price
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {pass.total_price}
                        </p>
                      </div>
                    </div>

                    {/* Edit Button - Shows on Hover */}
                    <button
                      onClick={() => setIsPricingModalOpen(true)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-white/90 hover:bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
                      title="Edit pricing"
                      disabled={isUpdatingPricing}
                    >
                      <Edit3 className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>

                  {/* Discount */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                        <Percent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-orange-600 uppercase tracking-wide">
                          Discount
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {parseFloat(pass.discount_percentage || 0)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Final Price */}
                  <div className="group">
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                          Final Price
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {pass.final_price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Toggle Control */}
          <div className="space-y-8">
            {/* Toggle Control Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Pass Control
                  </h3>
                </div>
              </div>

              <div className="p-6">
                {/* Toggle Switch */}
                <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        Toggle Status
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Click to activate/deactivate this pass
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-sm font-semibold ${
                          !pass.is_active ? "text-slate-900" : "text-slate-500"
                        }`}
                      >
                        Inactive
                      </span>

                      {/* Custom Toggle Switch */}
                      <div className="relative">
                        <button
                          onClick={handleToggleStatus}
                          disabled={isToggling}
                          className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 disabled:cursor-not-allowed ${
                            pass.is_active
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-slate-300 hover:bg-slate-400"
                          } ${isToggling ? "opacity-50" : ""}`}
                        >
                          <span
                            className={`inline-block w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                              pass.is_active ? "translate-x-8" : "translate-x-1"
                            }`}
                          />
                          {isToggling && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </button>
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          pass.is_active ? "text-slate-900" : "text-slate-500"
                        }`}
                      >
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="mt-4 p-4 bg-slate-100 rounded-xl">
                    <p className="text-slate-600 text-sm font-medium flex items-center">
                      {isToggling ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                          Updating pass status...
                        </>
                      ) : (
                        <>
                          {pass.is_active
                            ? "✅ This pass is currently active and available for purchase."
                            : "⚠️ This pass is inactive and not available for purchase."}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Quick Actions Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <IndianRupee className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Pricing Actions
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  disabled={isUpdatingPricing}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>
                    {isUpdatingPricing ? "Updating..." : "Edit Pricing"}
                  </span>
                </button>

                <p className="text-slate-600 text-sm mt-3 text-center">
                  Update original price and discount percentage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Edit Modal */}
        <PricingEditModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          currentPricing={{
            total_price: pass.total_price,
            discount_percentage: pass.discount_percentage || 0,
          }}
          onSave={handleUpdatePricing}
          isLoading={isUpdatingPricing}
          title="Edit Pass Pricing"
        />
      </div>
    </div>
  );
};

export default PassDetail;

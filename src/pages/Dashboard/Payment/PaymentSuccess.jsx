import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  CheckCircleIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setLoading(true);
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("Verified:", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Verification error:", err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50/30 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-emerald-100">
        {loading ? (
          <div className="py-10">
            <ArrowPathIcon className="h-16 w-16 text-emerald-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700">
              Verifying Transaction...
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Please do not close or refresh this page.
            </p>
          </div>
        ) : (
          <>
            {/* Success Icon Section */}
            <div className="relative flex justify-center mb-6">
              <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 blur-xl opacity-50"></div>
              <div className="relative bg-emerald-500 rounded-full p-4 shadow-lg shadow-emerald-200">
                <CheckCircleIcon className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Content Section */}
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Payment Success!
            </h2>
            <p className="text-emerald-700 font-medium mb-2">
              Order ID:{" "}
              <span className="text-gray-600">
                #{sessionId?.slice(-8).toUpperCase()}
              </span>
            </p>
            <p className="text-gray-500 mb-8 px-4">
              Your transaction was successful. We've sent a confirmation email
              with all the details.
            </p>

            {/* Actions Section */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard/my-orders")}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-100 active:scale-95"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Track Your Order
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full text-emerald-600 hover:text-emerald-700 font-semibold py-2 transition-all"
              >
                Continue Shopping
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Facing issues?{" "}
                <span className="text-emerald-500 cursor-pointer underline">
                  Contact Support
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

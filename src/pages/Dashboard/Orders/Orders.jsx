import React from "react";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import OrderTable from "../../../components/Dashboard/OrderTable/OrderTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orderPayments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orderPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}/payments`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Calculate total spent for the summary card
  const totalSpent = orderPayments.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0
  );

  return (
    <div className="animate-in fade-in duration-700">
      {/* Page Header & Stats */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Order <span className="text-emerald-600">History</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage and track all your book purchases in one place.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl">
            <span className="text-emerald-600 font-bold text-xl">$</span>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Total Investment
            </p>
            <p className="text-slate-900 font-black text-xl">
              {totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Cover
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Book Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Author
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Order Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Amount
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Payment
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Delivery
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orderPayments?.length > 0 ? (
                orderPayments.map((orderPayment) => (
                  <OrderTable
                    key={orderPayment._id}
                    orderPayment={orderPayment}
                    refetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">📦</span>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        No orders found in your history
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

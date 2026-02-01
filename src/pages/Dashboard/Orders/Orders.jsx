import React from "react";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import OrderTable from "../../../components/Dashboard/OrderTable/OrderTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMyBookOrderQuery } from "../../../redux/features/orders/orderSlice";

const Orders = () => {
  const { user } = useAuth();
  const { data: orderPayments = [], isLoading } = useMyBookOrderQuery(
    user?.email,
  );

  if (isLoading) return <Loading />;

  const totalSpent = orderPayments.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0,
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Order{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              History
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage and track all your book purchases in one place.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-colors">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
              $
            </span>
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Total Investment
            </p>
            <p className="text-slate-900 dark:text-white font-black text-xl">
              {totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Cover
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Book Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Author
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Order Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Amount
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Payment
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Delivery
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {orderPayments?.length > 0 ? (
                orderPayments.map((orderPayment) => (
                  <OrderTable
                    key={orderPayment._id}
                    orderPayment={orderPayment}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2 opacity-50">📦</span>
                      <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-xs">
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

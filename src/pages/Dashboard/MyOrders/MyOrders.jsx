import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import OrderTableRow from "../../../components/Dashboard/OrderTableRow/OrderTableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBox, FaWallet, FaShoppingBag, FaHistory } from "react-icons/fa";
import Loading from "../../../shared/Loading/Loading";
import { useMyOrderDataQuery } from "../../../redux/features/orders/orderSlice";

const MyOrders = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useMyOrderDataQuery(user?.email);

  if (isLoading) return <Loading />;

  const totalSpent = orders.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0,
  );

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[3px] mb-2">
            <FaHistory /> Purchase History
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Book{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Orders
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Track your purchases and delivery status in real-time.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all">
            <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FaWallet size={18} />
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest">
                Total Spent
              </p>
              <p className="text-slate-900 dark:text-white font-black text-lg">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-slate-900 dark:hover:border-emerald-500/50 transition-all">
            <div className="bg-slate-900 dark:bg-emerald-600 p-3 rounded-xl text-white">
              <FaShoppingBag size={18} />
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest">
                Orders
              </p>
              <p className="text-slate-900 dark:text-white font-black text-lg">
                {orders.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-left">
                  Book Information
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Order Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Payment
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Price/Qty
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Order Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderTableRow
                    order={order}
                    key={order._id}
                 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <FaBox className="text-slate-200 dark:text-slate-700 text-3xl" />
                      </div>
                      <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs italic">
                        No orders found in your history.
                      </p>
                      <button className="mt-6 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest hover:underline">
                        Start Shopping Now
                      </button>
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

export default MyOrders;

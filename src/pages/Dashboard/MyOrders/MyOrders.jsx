import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import OrderTableRow from "../../../components/Dashboard/OrderTableRow/OrderTableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Loading from "../../shared/Loading/Loading";
import { FaBox, FaWallet, FaShoppingBag, FaHistory } from "react-icons/fa";
import Loading from "../../../shared/Loading/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Quick Stats Calculation
  const totalSpent = orders.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0
  );

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[3px] mb-2">
            <FaHistory /> Purchase History
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            My Book <span className="text-emerald-600">Orders</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Track your purchases and delivery status in real-time.
          </p>
        </div>

        {/* Mini Stats Card */}
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-emerald-200 transition-all">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FaWallet size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                Total Spent
              </p>
              <p className="text-slate-900 font-black text-lg">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-slate-900 transition-all">
            <div className="bg-slate-900 p-3 rounded-xl text-white">
              <FaShoppingBag size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                Orders
              </p>
              <p className="text-slate-900 font-black text-lg">
                {orders.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-left">
                  Book Information
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Order Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Payment
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Price/Qty
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Order Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderTableRow
                    order={order}
                    key={order._id}
                    refetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FaBox className="text-slate-200 text-3xl" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">
                        No orders found in your history.
                      </p>
                      <button className="mt-6 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">
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

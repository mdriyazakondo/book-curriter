import React, { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingBasket } from "react-icons/fa";

const TotalOrder = () => {
  const { user, setIsLoadingLibrean } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orderPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}/payments`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Sync loading state with parent safely
  useEffect(() => {
    setIsLoadingLibrean(isLoading);
  }, [isLoading, setIsLoadingLibrean]);

  if (isLoading) return null;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 group hover:shadow-md dark:hover:shadow-emerald-900/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all duration-300">
      {/* Icon Section - Emerald Theme */}
      <div className="bg-emerald-50 dark:bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-white transition-colors duration-300 shadow-sm">
        <FaShoppingBasket size={24} />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Total Orders
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {orders.length}
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium ml-1">
            Items
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalOrder;

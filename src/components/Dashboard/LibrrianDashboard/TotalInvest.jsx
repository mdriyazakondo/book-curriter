import React, { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaWallet } from "react-icons/fa";

const TotalInvest = () => {
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

  useEffect(() => {
    setIsLoadingLibrean(isLoading);
  }, [isLoading, setIsLoadingLibrean]);

  const totalSpent = orders.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0
  );

  if (isLoading) return null;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 group hover:shadow-md dark:hover:shadow-blue-900/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300">
      <div className="bg-blue-50 dark:bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white transition-colors duration-300 shadow-sm">
        <FaWallet size={24} />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Total Investment
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-slate-900 dark:text-blue-400">
            $
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {totalSpent.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalInvest;

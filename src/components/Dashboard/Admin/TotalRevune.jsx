import React from "react";
import { FaWallet } from "react-icons/fa"; // আইকন পরিবর্তন করা হয়েছে
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TotalRevenue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: totalRevenueData, isLoading } = useQuery({
    queryKey: ["total-revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-revenue`);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-all duration-300">
      {/* Icon Container with Rose/Pink Theme */}
      <div className="bg-rose-500 dark:bg-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-500/20 dark:shadow-rose-900/20">
        <FaWallet />
      </div>

      {/* Revenue Info */}
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
          Total Revenue
        </p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {isLoading ? (
              <span className="text-xl">...</span>
            ) : (
              `$${totalRevenueData?.totalRevenue?.toLocaleString() ?? 0}`
            )}
          </h2>
          {!isLoading && (
            <span className="text-[10px] font-bold text-rose-500 uppercase">
              USD
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;

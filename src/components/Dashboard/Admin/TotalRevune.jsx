import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
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
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-5">
      <div className="bg-rose-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
        <FaUser />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          Total Revenue
        </p>
        <h2 className="text-2xl font-black text-slate-900 mt-1">
          {isLoading ? "Loading..." : `$${totalRevenueData?.totalRevenue ?? 0}`}
        </h2>
      </div>
    </div>
  );
};

export default TotalRevenue;

import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TotalUserAdminRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["all-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // ইমেইল না থাকলে কোয়েরি রান হবে না
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-all duration-300">
      {/* Icon Container with Blue Theme */}
      <div className="bg-blue-500 dark:bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20">
        <FaUser />
      </div>

      {/* Info Details */}
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
          Total Users
        </p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {isLoading ? "..." : allUsers?.length}
          </h2>
          <span className="text-[10px] font-bold text-blue-500 uppercase">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalUserAdminRole;

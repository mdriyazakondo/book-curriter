import React from "react";
import { FaBook } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TotalBookAdminRole = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mange-books`);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-all duration-300">
      <div className="bg-emerald-500 dark:bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20">
        <FaBook />
      </div>

      <div>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
          Total Books
        </p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {isLoading ? "..." : books?.length}
          </h2>
          <span className="text-[10px] font-bold text-emerald-500 uppercase">
            Live
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalBookAdminRole;

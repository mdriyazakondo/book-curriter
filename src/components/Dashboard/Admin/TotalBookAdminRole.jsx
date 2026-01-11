import React from "react";
import { FaBook, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TotalBookAdminRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mange-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mange-books`);
      return res.data;
    },
  });
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-5">
      <div
        className={`bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
      >
        <FaBook />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          Total Users
        </p>
        <h2 className="text-2xl font-black text-slate-900 mt-1">
          {books?.length}
        </h2>
      </div>
    </div>
  );
};

export default TotalBookAdminRole;

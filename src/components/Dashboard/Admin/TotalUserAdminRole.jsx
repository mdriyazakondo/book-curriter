import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TotalUserAdminRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-5">
      <div
        className={`bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
      >
        <FaUser />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          Total Users
        </p>
        <h2 className="text-2xl font-black text-slate-900 mt-1">
          {allUsers?.length}
        </h2>
      </div>
    </div>
  );
};

export default TotalUserAdminRole;

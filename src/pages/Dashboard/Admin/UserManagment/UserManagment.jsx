import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../shared/Loading/Loading";
import UserDataRow from "../../../../components/Dashboard/UserDataRow/UserDataRow";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UserManagment = () => {
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

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          User <span className="text-emerald-600">Management</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Review and update roles for all registered members.
        </p>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Profile
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Name
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Email Address
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Role
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center whitespace-nowrap">
                  Last Login
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allUsers.map((users) => (
                <UserDataRow key={users._id} users={users} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {allUsers.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[32px] mt-6 border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            No users found in the database
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagment;

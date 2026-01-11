import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../shared/Loading/Loading";
import UserDataRow from "../../../../components/Dashboard/UserDataRow/UserDataRow";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";

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
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-10 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[3px] mb-2">
          <FaUsers className="animate-pulse" /> Access Control
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          User{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Management
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
          Review and update roles for all registered members.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Profile
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Name
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Email Address
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Role
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center whitespace-nowrap">
                  Last Login
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {allUsers.length > 0 &&
                allUsers.map((users) => (
                  <UserDataRow
                    key={users._id}
                    users={users}
                    refetch={refetch}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {allUsers.length === 0 && (
          <div className="text-center py-32 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FaUsers
                  size={30}
                  className="text-slate-300 dark:text-slate-600"
                />
              </div>
              <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-xs">
                No users found in the database
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagment;

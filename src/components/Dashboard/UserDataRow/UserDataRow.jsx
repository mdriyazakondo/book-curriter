import React from "react";
import { useState } from "react";
import UpdateRoleModal from "../Modal/UpdateRoleModal";

const UserDataRow = ({ users, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center">
          <img
            src={users?.image}
            alt={users?.name}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 group-hover:ring-emerald-500/30 transition-all"
          />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {users?.name}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium lowercase">
          {users?.email}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            users?.role === "admin"
              ? "bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-900 border-slate-900 dark:border-emerald-500"
              : users?.role === "Librarian"
              ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20"
              : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
          }`}
        >
          {users?.role}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <p className="text-xs text-slate-500 dark:text-slate-300 font-bold">
          {new Date(users?.last_loggedIn).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
          {new Date(users?.last_loggedIn).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-emerald-600 dark:hover:border-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm hover:shadow-emerald-500/20"
        >
          Update Role
        </button>

        <UpdateRoleModal
          refetch={refetch}
          user={users}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;

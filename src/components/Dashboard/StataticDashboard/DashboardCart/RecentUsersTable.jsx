import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const RecentUsersTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["total-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-users`);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
            Recent Users
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            Newest Members
          </p>
        </div>
        <button className="bg-slate-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-black px-4 py-2 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4 h-16 bg-slate-50/50 dark:bg-slate-800/20"></td>
                  </tr>
                ))
              : allUsers
                  .slice(0, 5)
                  .map((total) => (
                    <UserRow
                      key={total._id}
                      name={total.name}
                      email={total.email}
                      role={total.role}
                      status="Active"
                      img={total.image}
                    />
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserRow = ({ name, email, role, status, img }) => (
  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
    <td className="px-6 py-4 flex items-center gap-4">
      <div className="relative">
        <img
          src={img}
          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700"
          alt={name}
        />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
      </div>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {name}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          {email}
        </p>
      </div>
    </td>

    <td className="px-6 py-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
        {role}
      </span>
    </td>

    <td className="px-6 py-4">
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            status === "Active" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        ></span>
        <span
          className={`text-[11px] font-bold ${
            status === "Active"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-amber-600"
          }`}
        >
          {status}
        </span>
      </div>
    </td>

    <td className="px-6 py-4 text-right">
      <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
        Manage
      </button>
    </td>
  </tr>
);

export default RecentUsersTable;

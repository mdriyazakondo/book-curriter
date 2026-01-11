import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// create_date: "2026-01-05T11:30:06.070Z";
// email: "aharmanhussain8@gmail.com";
// image: "https://lh3.googleusercontent.com/a/ACg8ocJDqY5yM9x0Hb8pg8tMvBuNRFCo9aTTUjr7ids0T85wbs8w3A=s96-c";
// last_loggedIn: "2026-01-05T11:30:06.070Z";
// name: "A H Arman Hussain";
// role: "customer";
// _id: "695ba0be29ba18eb892d94e1";
const RecentUsersTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allUsers = [] } = useQuery({
    queryKey: ["total-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-users`);
      return res.data;
    },
  });
  console.log(allUsers);
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Recent Users</h3>
        <button className="text-emerald-600 text-sm font-bold hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-50">
            {allUsers.map((total) => (
              <UserRow
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
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 flex items-center gap-3">
      <img src={img} className="w-10 h-10 rounded-xl" />
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-xs text-slate-400">{email}</p>
      </div>
    </td>
    <td className="px-6 py-4 font-bold text-slate-600">{role}</td>
    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${
          status === "Active"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="font-bold text-slate-400 hover:text-slate-900">
        Manage
      </button>
    </td>
  </tr>
);

export default RecentUsersTable;

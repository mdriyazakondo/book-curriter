const RecentUsersTable = () => {
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
            <UserRow
              name="Alex Morgan"
              email="alex@mail.com"
              role="Customer"
              status="Active"
              img="https://i.pravatar.cc/150?u=1"
            />
            <UserRow
              name="Sarah Connor"
              email="sarah@mail.com"
              role="Librarian"
              status="Pending"
              img="https://i.pravatar.cc/150?u=2"
            />
            <UserRow
              name="John Wick"
              email="wick@mail.com"
              role="Admin"
              status="Active"
              img="https://i.pravatar.cc/150?u=3"
            />
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

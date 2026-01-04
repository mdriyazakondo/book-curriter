import {
  FaTools,
  FaUserShield,
  FaChartPie,
  FaBook,
  FaUser,
  FaTruckMoving,
  FaStar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", orders: 400, users: 240 },
  { name: "Feb", orders: 300, users: 139 },
  { name: "Mar", orders: 200, users: 980 },
  { name: "Apr", orders: 278, users: 390 },
  { name: "May", orders: 189, users: 480 },
  { name: "Jun", orders: 239, users: 380 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900">
          System <span className="text-emerald-600">Overview</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Monitor and manage your platform activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="1,248"
          icon={<FaUser />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Books"
          value="850"
          icon={<FaBook />}
          color="bg-emerald-500"
        />
        <StatCard
          title="Active Parcels"
          value="42"
          icon={<FaTruckMoving />}
          color="bg-amber-500"
        />
        <StatCard
          title="Total Revenue"
          value="$12,450"
          icon={<FaChartPie />}
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Growth Analytics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            User Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar
                  dataKey="users"
                  fill="#0f172a"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Recent Users</h3>
          <button className="text-emerald-600 text-sm font-bold hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  User Info
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
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
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-5">
    <div
      className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
        {title}
      </p>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{value}</h2>
    </div>
  </div>
);

const UserRow = ({ name, email, role, status, img }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={img} className="w-10 h-10 rounded-xl object-cover" alt="" />
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400 font-medium">{email}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-sm font-bold text-slate-600">{role}</td>
    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === "Active"
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
            : "bg-amber-50 text-amber-600 border border-amber-100"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-slate-400 hover:text-slate-900 font-bold transition-colors">
        Manage
      </button>
    </td>
  </tr>
);

export default AdminDashboard;

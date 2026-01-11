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

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Area Chart - Growth Analytics */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
            Growth{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Analytics
            </span>
          </h3>
          <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            Orders
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#94a3b8"
                className="opacity-10 dark:opacity-5"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "16px",
                  color: "#fff",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#10b981", fontWeight: 800 }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={4}
                fill="url(#colorOrders)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - User Distribution */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
            User{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Distribution
            </span>
          </h3>
          <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            Engagement
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#94a3b8"
                className="opacity-10 dark:opacity-5"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="users"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
                barSize={32}
                animationDuration={2000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;

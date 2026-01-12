import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ChartTwo = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch total users
  const { data: totalUser = [], isLoading } = useQuery({
    queryKey: ["total-user-result"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-user-result`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // 🔹 Transform API data for Recharts
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = totalUser.map((item) => ({
    name: `${monthNames[item._id.month - 1]}-${item._id.year}`,
    users: item.totalUser,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
          User Growth{" "}
          <span className="text-blue-600 dark:text-blue-400">Analytics</span>
        </h3>
        <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Users
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#3b82f6", fontWeight: 800 }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={4}
              fill="url(#userColor)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartTwo;

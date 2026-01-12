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

const DashboardCharts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: totalPayment = [], isLoading } = useQuery({
    queryKey: ["total-payment-result"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-payment-result`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const transformedData = totalPayment.map((item) => {
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

    return {
      name: `${monthNames[item._id.month - 1]}-${item._id.year}`,
      amount: item.totalAmount,
      count: item.count,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
          Growth{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Analytics
          </span>
        </h3>
        <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Revenue
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transformedData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={4}
              fill="url(#colorAmount)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;

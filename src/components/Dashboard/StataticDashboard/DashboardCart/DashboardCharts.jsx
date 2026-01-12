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
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";

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
      <ChartOne />
      <ChartTwo />
    </div>
  );
};

export default DashboardCharts;

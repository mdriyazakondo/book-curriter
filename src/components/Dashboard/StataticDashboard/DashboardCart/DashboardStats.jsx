import { FaChartPie } from "react-icons/fa";
import TotalBookAdminRole from "../../Admin/TotalBookAdminRole";
import TotalUserAdminRole from "../../Admin/TotalUserAdminRole";
import TotalRevenue from "../../Admin/TotalRevune";

const DashboardStats = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          System{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Overview
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
          Monitor and manage your platform activities from a single dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCardWrapper>
          <TotalBookAdminRole />
        </StatsCardWrapper>

        <StatsCardWrapper>
          <TotalUserAdminRole />
        </StatsCardWrapper>

        <StatsCardWrapper>
          <TotalRevenue />
        </StatsCardWrapper>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-[2px] transition-all hover:text-emerald-500 cursor-default">
          <FaChartPie className="text-emerald-500 animate-spin-slow" />
          Live Analytics Enabled
        </div>
      </div>
    </div>
  );
};

// Reusable Wrapper for consistent hover effects
const StatsCardWrapper = ({ children }) => (
  <div className="transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl dark:hover:shadow-emerald-500/5">
    {children}
  </div>
);

export default DashboardStats;

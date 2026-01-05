import { FaUser, FaBook, FaTruckMoving, FaChartPie } from "react-icons/fa";

const DashboardStats = () => {
  return (
    <>
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
    </>
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

export default DashboardStats;

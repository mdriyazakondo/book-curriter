import { FaUser, FaBook, FaTruckMoving, FaChartPie } from "react-icons/fa";
import TotalBookAdminRole from "../../Admin/TotalBookAdminRole";
import TotalUserAdminRole from "../../Admin/TotalUserAdminRole";
import TotalRevenue from "../../Admin/TotalRevune";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalBookAdminRole />
        <TotalUserAdminRole />
        <TotalRevenue />
      </div>
    </>
  );
};

export default DashboardStats;

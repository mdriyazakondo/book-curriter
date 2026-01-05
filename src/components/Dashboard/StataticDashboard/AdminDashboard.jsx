import DashboardCharts from "./DashboardCart/DashboardCharts";
import DashboardStats from "./DashboardCart/DashboardStats";
import RecentUsersTable from "./DashboardCart/RecentUsersTable";

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <DashboardStats />
      <DashboardCharts />
      <RecentUsersTable />
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "../../../components/Dashboard/StataticDashboard/AdminDashboard";
import LibrarianDashboard from "../../../components/Dashboard/StataticDashboard/LibrarianDashboard";
import UserDashboard from "../../../components/Dashboard/StataticDashboard/UserDashboard";

const StataticDashboard = () => {
  const [role] = useRole();
  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "Librarian" && <LibrarianDashboard />}
      {role === "customer" && <UserDashboard />}
    </div>
  );
};

export default StataticDashboard;

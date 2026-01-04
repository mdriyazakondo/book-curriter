import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FiHome, FiMenu } from "react-icons/fi";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaHeartPulse, FaRegCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaBook, FaJediOrder } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { SiWikibooks } from "react-icons/si";
import { BsBorderStyle } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const { user, logoutUserFunc, loading } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  const isActive = (path) =>
    pathname === path
      ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200"
      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 font-medium";

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will need to login again to access your dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-[24px]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      await logoutUserFunc();
      Swal.fire({
        title: "Logged Out",
        text: "See you again soon!",
        icon: "success",
        confirmButtonColor: "#059669",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to logout",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="drawer lg:drawer-open">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <nav className="navbar bg-white border-b border-slate-100 px-6 h-20 sticky top-0 z-30">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="drawer-toggle"
                className="btn btn-ghost text-slate-600"
              >
                <FiMenu className="text-2xl" />
              </label>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-slate-900 lg:hidden ml-2">
                Book<span className="text-emerald-600">Courier</span>
              </h2>
            </div>
            <div className="flex-none gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-slate-900">
                  {user?.displayName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">
                  {role}
                </span>
              </div>
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-50"
                alt="profile"
              />
            </div>
          </nav>

          <main className="p-6 lg:p-10">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
          <aside className="w-72 bg-white border-r border-slate-100 min-h-full flex flex-col">
            <div className="p-8 h-20 flex items-center">
              <Link
                to={"/"}
                className="text-2xl font-black text-slate-900 tracking-tight"
              >
                Book<span className="text-emerald-600 italic">Courier</span>
              </Link>
            </div>

            <div className="px-4 py-6 flex-1 overflow-y-auto">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4">
                Main Menu
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/"
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                      "/"
                    )}`}
                  >
                    <FiHome className="text-xl" />
                    <span>Back to Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                      "/dashboard"
                    )}`}
                  >
                    <MdDashboard className="text-xl" />
                    <span>Dashboard Stats</span>
                  </Link>
                </li>

                {role === "customer" && (
                  <>
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">
                      Customer Portal
                    </div>
                    <li>
                      <Link
                        to="/dashboard/my-orders"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/my-orders"
                        )}`}
                      >
                        <FaJediOrder className="text-xl" />
                        <span>My Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/invoices"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/invoices"
                        )}`}
                      >
                        <LiaFileInvoiceSolid className="text-xl" />
                        <span>My Invoices</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/wish-list"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/wish-list"
                        )}`}
                      >
                        <FaHeartPulse className="text-xl" />
                        <span>Wish List</span>
                      </Link>
                    </li>
                  </>
                )}

                {role === "Librarian" && (
                  <>
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">
                      Librarian Hub
                    </div>
                    <li>
                      <Link
                        to="/dashboard/add-books"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/add-books"
                        )}`}
                      >
                        <FaBook className="text-xl" />
                        <span>Add New Book</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/my-books"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/my-books"
                        )}`}
                      >
                        <SiWikibooks className="text-xl" />
                        <span>Inventory</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/orders"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/orders"
                        )}`}
                      >
                        <BsBorderStyle className="text-xl" />
                        <span>Sales Orders</span>
                      </Link>
                    </li>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">
                      Admin Control
                    </div>
                    <li>
                      <Link
                        to="/dashboard/all-user"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/all-user"
                        )}`}
                      >
                        <GrUserManager className="text-xl" />
                        <span>User Management</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/manage-book"
                        className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                          "/dashboard/manage-book"
                        )}`}
                      >
                        <FaBook className="text-xl" />
                        <span>Global Books</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-4 mt-auto border-t border-slate-50">
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/dashboard/profile"
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive(
                      "/dashboard/profile"
                    )}`}
                  >
                    <FaRegCircleUser className="text-xl" />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3.5 py-3 px-4 rounded-2xl text-rose-500 hover:bg-rose-50 font-bold transition-all duration-300 group"
                  >
                    <MdLogout className="text-xl transition-transform group-hover:translate-x-1" />
                    <span>Logout Session</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

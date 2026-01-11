import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FiHome, FiMenu, FiSun, FiMoon } from "react-icons/fi"; // Sun, Moon icon add kora hoyeche
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

  // --- Dark Mode Logic Start ---
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  // --- Dark Mode Logic End ---

  const isActive = (path) =>
    pathname === path
      ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200/20"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium";

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
        popup: "rounded-[24px] dark:bg-slate-800 dark:text-white",
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <div className="drawer lg:drawer-open">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <nav className="navbar bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 h-20 sticky top-0 z-30">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="drawer-toggle"
                className="btn btn-ghost text-slate-600 dark:text-slate-400"
              >
                <FiMenu className="text-2xl" />
              </label>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-slate-900 dark:text-white lg:hidden ml-2">
                Book<span className="text-emerald-600">Courier</span>
              </h2>
            </div>

            <div className="flex-none gap-4 flex items-center">
              {/* --- Theme Toggle Button --- */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-emerald-100 dark:ring-slate-700 transition-all"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {user?.displayName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">
                  {role}
                </span>
              </div>
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-50 dark:ring-slate-800"
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
          <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 min-h-full flex flex-col">
            <div className="p-8 h-20 flex items-center">
              <Link
                to={"/"}
                className="text-2xl font-black text-slate-900 dark:text-white tracking-tight"
              >
                Book<span className="text-emerald-600 italic">Courier</span>
              </Link>
            </div>

            <div className="px-4 py-6 flex-1 overflow-y-auto">
              <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[2px] mb-4">
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
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
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
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
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
                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
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

            <div className="p-4 mt-auto border-t border-slate-50 dark:border-slate-800">
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
                    className="w-full flex items-center gap-3.5 py-3 px-4 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-bold transition-all duration-300 group"
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

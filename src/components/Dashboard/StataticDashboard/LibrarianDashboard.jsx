import React from "react";
import {
  FaBook,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import ManagementCard from "../LibrrianDashboard/ManagementCard";
import TotalOrder from "../LibrrianDashboard/TotalOrder";
import TotalInvest from "../LibrrianDashboard/TotalInvest";
import TotalBook from "../LibrrianDashboard/TotalBook";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading/Loading";

const LibrarianDashboard = () => {
  const { setIsLoadingLibrean } = useAuth();

  if (setIsLoadingLibrean) <Loading />;
  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Librarian <span className="text-emerald-600">Hub</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            System control panel and real-time library analytics.
          </p>
        </div>
        <Link
          to="/dashboard/add-books"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100"
        >
          <FaPlus size={14} /> Add New Entry
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
        <TotalBook />
        <TotalOrder />
        <TotalInvest />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black text-slate-900 px-2">
            Inventory Control
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ManagementCard
              to="/dashboard/my-books"
              title="Catalog Manager"
              desc="Edit book metadata, update stock, and manage status."
              icon={<FaBook />}
            />
            <ManagementCard
              to="/dashboard/orders"
              title="Order Requests"
              desc="Review pending book requests and delivery logs."
              icon={<FaClipboardList />}
            />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-slate-900 flex items-center gap-2">
                <FaChartLine className="text-emerald-500" /> Recent Trends
              </h4>
            </div>
            <div className="h-40 bg-slate-50 rounded-3xl flex items-center justify-center border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">
                Analytics Chart Coming Soon...
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 px-2">
            Quick Access
          </h3>
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[3px] mb-4">
                System Update
              </p>
              <h4 className="text-lg font-bold mb-4">Inventory Audit Needed</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                There are 12 books with low stock alerts. Please review the
                inventory list.
              </p>
              <Link
                to="/dashboard/my-books"
                className="inline-flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
              >
                Audit Now <FaArrowRight />
              </Link>
            </div>
            <div className="absolute -right-6 -bottom-6 text-slate-800 text-8xl opacity-30">
              <FaExclamationCircle />
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[40px] p-8 border border-emerald-100">
            <h4 className="font-black text-emerald-900 mb-2">Need Help?</h4>
            <p className="text-emerald-700/70 text-sm mb-4">
              Check our librarian manual for system guidelines.
            </p>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all">
              View Manual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;

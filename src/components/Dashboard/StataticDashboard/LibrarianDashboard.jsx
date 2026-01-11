import React from "react";
import {
  FaBook,
  FaPlus,
  FaClipboardList,
  FaChartLine,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import ManagementCard from "../LibrrianDashboard/ManagementCard";
import TotalOrder from "../LibrrianDashboard/TotalOrder";
import TotalInvest from "../LibrrianDashboard/TotalInvest";
import TotalBook from "../LibrrianDashboard/TotalBook";

const LibrarianDashboard = () => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-10 transition-colors duration-300">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Librarian <span className="text-emerald-600">Hub</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            System control panel and real-time library analytics.
          </p>
        </div>
        <Link
          to="/dashboard/add-books"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 dark:shadow-none"
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
          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 px-2">
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

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FaChartLine className="text-emerald-500" /> Recent Trends
              </h4>
            </div>
            <div className="h-40 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest italic">
                Analytics Chart Coming Soon...
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 px-2">
            Quick Access
          </h3>

          <div className="bg-slate-900 dark:bg-emerald-950/30 rounded-[40px] p-8 text-white relative overflow-hidden border border-transparent dark:border-emerald-900/30">
            <div className="relative z-10">
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[3px] mb-4">
                System Update
              </p>
              <h4 className="text-lg font-bold mb-4">Inventory Audit Needed</h4>
              <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed mb-6">
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
            <div className="absolute -right-6 -bottom-6 text-white/5 dark:text-emerald-900/20 text-8xl">
              <FaExclamationCircle />
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-slate-900 rounded-[40px] p-8 border border-emerald-100 dark:border-slate-800 transition-all">
            <h4 className="font-black text-emerald-900 dark:text-emerald-500 mb-2">
              Need Help?
            </h4>
            <p className="text-emerald-700/70 dark:text-slate-400 text-sm mb-4">
              Check our librarian manual for system guidelines.
            </p>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all cursor-pointer">
              View Manual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;

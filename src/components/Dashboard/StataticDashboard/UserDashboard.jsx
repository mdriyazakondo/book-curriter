import React from "react";
import {
  FaBook,
  FaHeart,
  FaUser,
  FaShoppingBag,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-10">
      {/* Header & Welcome */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Reader <span className="text-emerald-600">Portal</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Hello, {user?.displayName || "Reader"}! Ready to explore your next
          favorite book?
        </p>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* My Orders */}
        <UserCard
          to="/dashboard/my-orders"
          icon={<FaShoppingBag />}
          title="My Orders"
          desc="View your purchase history and track delivery status."
          color="navy"
          count="Active"
        />

        {/* Wishlist */}
        <UserCard
          to="/dashboard/wish-list"
          icon={<FaHeart />}
          title="Wishlist"
          desc="Your personal collection of books to read later."
          color="emerald"
          count="Saved"
        />

        {/* Profile */}
        <UserCard
          to="/dashboard/profile"
          icon={<FaUser />}
          title="My Profile"
          desc="Manage your account settings and personal info."
          color="slate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reading Insight Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[3px] mb-4">
                <FaStar /> Reading Journey
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Your Library is Growing!
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed max-w-md mb-8">
                Keep track of all your purchased books and build your own
                digital library. Don't forget to review the books you've read!
              </p>
              <Link
                to="/all-books"
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all group"
              >
                Browse More Books
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Background Graphic Icon */}
            <FaBook className="absolute -right-10 -bottom-10 text-[200px] text-slate-50 opacity-[0.03] rotate-12" />
          </div>
        </div>

        {/* Quick Notification/Alert Sidebar */}
        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-[40px] p-8 text-white">
            <h4 className="text-xl font-bold mb-3">Flash Sale! ⚡</h4>
            <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
              Get 20% off on all Mystery and Thriller books this weekend only.
            </p>
            <Link
              to="/all-books"
              className="text-white font-black text-xs uppercase tracking-widest border-b-2 border-emerald-400 pb-1 hover:border-white transition-all"
            >
              Shop Collection
            </Link>
          </div>

          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2">Need Help?</h4>
            <p className="text-slate-500 text-sm mb-4">
              Questions about your order or delivery?
            </p>
            <button className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-2xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable User Card
const UserCard = ({ to, icon, title, desc, color, count }) => {
  const isEmerald = color === "emerald";

  return (
    <Link
      to={to}
      className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all relative overflow-hidden"
    >
      {/* Badge for 'Active' or 'Saved' */}
      {count && (
        <span className="absolute top-6 right-6 bg-slate-50 text-slate-400 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          {count}
        </span>
      )}

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
          isEmerald
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-900 text-white"
        } shadow-lg`}
      >
        <span className="text-2xl">{icon}</span>
      </div>

      <h2 className="text-xl font-black text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>

      <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
        View Details <FaArrowRight />
      </div>
    </Link>
  );
};

export default UserDashboard;

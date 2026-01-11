import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-slate-900 dark:to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <img
            src="https://ik.imagekit.io/2o23yla4n/book-corrier.png"
            alt="logo"
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-sm object-cover transition-transform duration-500 group-hover:rotate-[360deg]"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none italic">
            <span className="text-slate-900 dark:text-white transition-colors duration-300">
              Book
            </span>
            <span className="text-emerald-600">Courier</span>
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 leading-none mt-1">
            Fast & Reliable
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;

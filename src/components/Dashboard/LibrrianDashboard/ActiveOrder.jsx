import React from "react";

const ActiveOrder = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-emerald-200 transition-all"
        >
          <div
            className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Active Orders
            </p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveOrder;

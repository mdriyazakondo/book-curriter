import { Link } from "react-router";

const ManagementCard = ({ to, title, desc, icon }) => (
  <Link
    to={to}
    className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/50 transition-all group shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10"
  >
    <div className="text-emerald-500 dark:text-emerald-400 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>

    <h4 className="font-black text-slate-900 dark:text-white mb-2 transition-colors">
      {title}
    </h4>

    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
      {desc}
    </p>
  </Link>
);

export default ManagementCard;

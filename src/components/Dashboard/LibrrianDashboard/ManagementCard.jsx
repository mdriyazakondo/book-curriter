import { Link } from "react-router";

const ManagementCard = ({ to, title, desc, icon }) => (
  <Link
    to={to}
    className="bg-white p-8 rounded-[32px] border border-slate-100 hover:border-emerald-500/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-emerald-500/5"
  >
    <div className="text-emerald-500 text-2xl mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </Link>
);

export default ManagementCard;

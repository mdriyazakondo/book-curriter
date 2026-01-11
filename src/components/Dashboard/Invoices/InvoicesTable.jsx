import { FaCopy, FaDownload, FaCalendarCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const InvoicesTable = ({ order }) => {
  const {
    bookName,
    customer_email,
    transationId,
    customer_name,
    price,
    status,
    payment_date,
  } = order;

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    Swal.fire({
      title: "Copied!",
      text: "Transaction ID copied to clipboard",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      customClass: {
        popup:
          "rounded-[24px] dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-800",
        title: "dark:text-white",
      },
    });
  };

  return (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 border-b border-slate-50 dark:border-slate-800 last:border-0">
      <td className="py-5 px-6">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {bookName}
        </p>
      </td>

      <td className="py-5 px-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {customer_name}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            {customer_email}
          </span>
        </div>
      </td>

      <td className="py-5 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <code className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
            {transationId?.slice(0, 10)}...
          </code>
          <button
            onClick={() => handleCopy(transationId)}
            className="text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Copy Transaction ID"
          >
            <FaCopy size={12} />
          </button>
        </div>
      </td>

      <td className="py-5 px-6 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            status?.toLowerCase() === "pending"
              ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
              : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="py-5 px-6 text-center font-black text-slate-900 dark:text-white">
        ${parseFloat(price).toFixed(2)}
      </td>

      <td className="py-5 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
          <FaCalendarCheck
            size={12}
            className="text-emerald-500 dark:text-emerald-400 opacity-60"
          />
          <span className="text-[11px] font-bold">
            {new Date(payment_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </td>

      <td className="py-5 px-6 text-center">
        <button
          className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-900 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white hover:border-slate-900 dark:hover:border-emerald-600 transition-all shadow-sm active:scale-95 group/btn"
          title="Download PDF Invoice"
        >
          <FaDownload size={14} className="group-hover/btn:animate-bounce" />
        </button>
      </td>
    </tr>
  );
};

export default InvoicesTable;

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
  console.log(order);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    Swal.fire({
      title: "Copied!",
      text: "Transaction ID copied to clipboard",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-[20px]",
      },
    });
  };

  return (
    <tr className="group hover:bg-slate-50 transition-all duration-300">
      <td className="py-5 px-6">
        <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
          {bookName}
        </p>
      </td>


      <td className="py-5 px-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-slate-700">
            {customer_name}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {customer_email}
          </span>
        </div>
      </td>

      {/* Transaction ID with Copy Button */}
      <td className="py-5 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <code className="text-[11px] font-mono font-bold text-slate-600">
            {transationId?.slice(0, 10)}...
          </code>
          <button
            onClick={() => handleCopy(transationId)}
            className="text-slate-400 hover:text-emerald-600 transition-colors"
            title="Copy Transaction ID"
          >
            <FaCopy size={12} />
          </button>
        </div>
      </td>

      {/* Status Badge */}
      <td className="py-5 px-6 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            status === "pending"
              ? "bg-amber-50 text-amber-600 border-amber-100"
              : "bg-emerald-50 text-emerald-600 border-emerald-100"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Price */}
      <td className="py-5 px-6 text-center font-black text-slate-900">
        ${parseFloat(price).toFixed(2)}
      </td>

      {/* Payment Date */}
      <td className="py-5 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500">
          <FaCalendarCheck size={12} className="text-emerald-500 opacity-60" />
          <span className="text-[11px] font-bold">
            {new Date(payment_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </td>

      {/* Invoice Download Action */}
      <td className="py-5 px-6 text-center">
        <button
          className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95 group/btn"
          title="Download PDF Invoice"
        >
          <FaDownload size={14} className="group-hover/btn:animate-bounce" />
        </button>
      </td>
    </tr>
  );
};

export default InvoicesTable;

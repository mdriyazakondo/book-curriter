import React, { useState } from "react";
import OrderModal from "../Modal/OrderModal";
import { FaCheckCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

const OrderTable = ({ orderPayment, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const { image, name, authorName, price, status, paymentStatus, order_date } =
    orderPayment;

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-50 dark:border-slate-800 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center">
          <img
            src={image}
            alt={name}
            className="w-10 h-14 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-slate-100 dark:ring-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {name}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {authorName}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
          <FaCalendarAlt size={12} />
          <span className="text-xs font-bold uppercase tracking-tighter">
            {new Date(order_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm font-black text-slate-900 dark:text-white">
          ${parseFloat(price).toFixed(2)}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex justify-center">
          {paymentStatus?.toLowerCase() === "paid" ? (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
              <FaCheckCircle size={10} /> Paid
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-500/20">
              <FaClock size={10} /> Pending
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border shadow-sm active:scale-95 ${
            status?.toLowerCase() === "delivered"
              ? "bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
          }`}
        >
          {status}
        </button>

        <OrderModal
          refetch={refetch}
          orderPayment={orderPayment}
          isOpen={isOpen}
          closeModal={closeModal}
          bookId={orderPayment._id}
        />
      </td>
    </tr>
  );
};

export default OrderTable;

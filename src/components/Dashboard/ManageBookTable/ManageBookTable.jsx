import React, { useState } from "react";
import ManageBookModal from "../Modal/ManageBookTable";
import { FaTrashAlt } from "react-icons/fa";

const ManageBookTable = ({ book, refetch, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    bookName,
    authorName,
    language,
    price,
    status,
    image,
    create_date,
    _id,
  } = book;

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-50 dark:border-slate-800 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center">
          <img
            src={image}
            alt={bookName}
            className="w-10 h-14 object-cover rounded-md shadow-sm group-hover:shadow-md transition-all group-hover:scale-105 ring-1 ring-slate-100 dark:ring-slate-700"
          />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {bookName}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">
          {authorName}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-tighter">
          {new Date(create_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
          ${price.toLocaleString()}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700">
          {language}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              status === "Available"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-900"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20 hover:bg-amber-600 hover:text-white"
            }`}
          >
            {status}
          </button>

          <button
            onClick={() => handleDelete(_id)}
            className="p-2.5 text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 transition-colors"
            title="Delete Book"
          >
            <FaTrashAlt size={14} />
          </button>
        </div>

        <ManageBookModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          bookId={book._id}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default ManageBookTable;

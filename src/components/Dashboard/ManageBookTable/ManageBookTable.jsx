import React, { useState } from "react";
import ManageBookModal from "../Modal/ManageBookTable";

const ManageBookTable = ({ book, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { bookName, authorName, language, price, status, image, create_date } =
    book;

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0">
      {/* Cover Image */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center">
          <img
            src={image}
            alt={bookName}
            className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-slate-100"
          />
        </div>
      </td>

      {/* Book Details */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
          {bookName}
        </p>
      </td>

      {/* Author */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-500 font-medium italic">
          {authorName}
        </p>
      </td>

      {/* Creation Date */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <p className="text-xs text-slate-400 font-bold">
          {new Date(create_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-black text-emerald-600">${price}</p>
      </td>

      {/* Language */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
          {language}
        </span>
      </td>

      {/* Status & Action */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => setIsOpen(true)}
          className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
            status === "Available"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white"
              : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white"
          }`}
        >
          {status}
        </button>

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

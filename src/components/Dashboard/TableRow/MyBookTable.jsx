import React, { useState } from "react";
import BookModal from "../Modal/BookModal";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyBookTable = ({ book, handleDelete, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const { bookName, authorName, language, price, status, image, create_date } =
    book;

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center">
          <img
            src={image}
            alt={bookName}
            className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-slate-100"
          />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
          {bookName}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-slate-500 font-medium italic">
          {authorName}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
          {new Date(create_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <p className="text-sm font-black text-emerald-600">${price}</p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
          {language}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={() => setIsOpen(true)}
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
            status === "published"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-amber-50 text-amber-600 border-amber-100"
          }`}
        >
          {status}
        </button>

        <BookModal
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
          bookId={book._id}
        />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/dashboard/update-book/${book._id}`}
            className="p-2.5 bg-white hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 rounded-xl transition-all duration-300 shadow-sm"
            title="Update Book"
          >
            <FaEdit size={14} />
          </Link>

          <button
            disabled={status === "published"}
            onClick={() => handleDelete(book._id)}
            className={`p-2.5 rounded-xl border transition-all duration-300 shadow-sm ${
              status === "published"
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                : "bg-white hover:bg-rose-600 text-rose-500 hover:text-white border-rose-100 hover:border-rose-600"
            }`}
            title={
              status === "published"
                ? "Cannot delete published book"
                : "Delete Book"
            }
          >
            <FaTrashAlt size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyBookTable;

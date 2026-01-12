import React from "react";
import { Link } from "react-router";

const BookCard = ({ latest }) => {
  const {
    bookName,
    authorName,
    genre,
    price,
    status,
    image,
    _id,
    description,
  } = latest;

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden h-64 bg-slate-50 dark:bg-slate-900/50">
        <img
          src={image}
          alt={bookName}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-700 dark:text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100 dark:border-slate-700">
            {genre}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-sm ${
              status === "published" || status === "Available"
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            }`}
          >
            {status === "published" ? "New" : status}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <h2 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {bookName}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-2 italic">
          By:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200 not-italic">
            {authorName}
          </span>
        </p>
        <p className="mb-3">{description.slice(0, 38)}...</p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                Price
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-emerald-500">
                ${price}
              </span>
            </div>
          </div>

          <Link to={`/books/${_id}`}>
            <button className="w-full py-3 bg-slate-900 dark:bg-emerald-600 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300 shadow-md active:scale-95">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

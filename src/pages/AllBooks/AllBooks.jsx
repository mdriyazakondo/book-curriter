import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Loading from "../../shared/Loading/Loading";
import BookCard from "../../shared/BookCard/BookCard";
import Container from "../../shared/Container/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaSearch,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [searBook, setSearchBook] = useState("");
  const [sortBook, setSortBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", searBook, sortBook],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?sort=${sortBook}&search=${searBook}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searBook, sortBook]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 pt-10 transition-colors duration-300">
      <Container>
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore Our <span className="text-emerald-600">Collection</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-3">
              Discover {books.length} amazing titles from around the world.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="relative w-full md:w-1/2 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                value={searBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Search by title, author or genre..."
                className="w-full py-4 pl-12 pr-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 text-slate-900 dark:text-white transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="relative w-full md:w-60">
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <select
                onChange={(e) => setSortBook(e.target.value)}
                value={sortBook}
                className="w-full appearance-none py-4 pl-12 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">
                  Sort By Price
                </option>
                <option value="normal" className="dark:bg-slate-900">
                  Default
                </option>
                <option value="low-high" className="dark:bg-slate-900">
                  Price: Low to High
                </option>
                <option value="high-low" className="dark:bg-slate-900">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentBooks.map((latest) => (
              <div
                key={latest?._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <BookCard latest={latest} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-sm">
              No books found for your search.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
            >
              <FaChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-2 px-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-12 h-12 rounded-2xl font-black transition-all ${
                    currentPage === index + 1
                      ? "bg-emerald-600 text-white shadow-lg dark:shadow-emerald-900/20 scale-110"
                      : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllBooks;

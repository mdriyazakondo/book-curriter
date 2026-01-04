import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
        `/books?sort=${sortBook}&&search=${searBook}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20 pt-10 animate-in fade-in duration-700">
      <Container>
        {/* Header & Filter Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Explore Our <span className="text-emerald-600">Collection</span>
            </h2>
            <p className="text-slate-500 font-medium mt-3">
              Discover {books.length} amazing titles from around the world.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            {/* Search Input */}
            <div className="relative w-full md:w-1/2 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                value={searBook}
                onChange={(e) => {
                  setSearchBook(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
                placeholder="Search by title, author or genre..."
                className="w-full py-4 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-[240px]">
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                onChange={(e) => setSortBook(e.target.value)}
                value={sortBook}
                className="w-full appearance-none py-4 pl-12 pr-10 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 cursor-pointer"
              >
                <option value="">Sort By Price</option>
                <option value="normal">Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentBooks.map((latest) => (
              <BookCard key={latest?._id} latest={latest} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              No books found for your search.
            </p>
          </div>
        )}

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white transition-all shadow-sm"
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-110"
                      : "bg-white text-slate-400 border border-slate-100 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white transition-all shadow-sm"
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

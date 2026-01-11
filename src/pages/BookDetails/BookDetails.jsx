import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BookRating from "../../components/BookRaring/BookRating";
import BookOrderModal from "../../components/Dashboard/Modal/BookOrderModal";
import { useState } from "react";
import {
  FaHeart,
  FaShoppingBasket,
  FaBookOpen,
  FaGlobe,
  FaLayerGroup,
  FaHashtag,
  FaFeatherAlt,
} from "react-icons/fa";

const BookDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const handleWishList = async (books) => {
    const bookWishListData = {
      userEmail: user?.email,
      userName: user?.displayName,
      bookName: books.bookName,
      image: books.image,
      authorName: books.authorName,
      authorEmail: books.authorEmail,
    };

    try {
      const res = await axiosSecure.post(`/wish-list`, bookWishListData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added!",
          text: "Saved to your wishlist.",
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "rounded-[32px] dark:bg-slate-900 dark:text-white",
          },
        });
        navigate("/dashboard/wish-list");
      } else {
        Swal.fire({
          title: "Note",
          text: "Already in your wishlist.",
          icon: "info",
          confirmButtonColor: "#0f172a",
          customClass: {
            popup: "rounded-[32px] dark:bg-slate-900 dark:text-white",
          },
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update wishlist.", "error");
    }
  };

  if (isLoading) return <Loading />;

  const {
    bookName,
    authorName,
    authorEmail,
    genre,
    language,
    pageNumber,
    edition,
    category,
    format,
    description,
    price,
    status,
    image,
  } = book;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-500 animate-in fade-in zoom-in-95">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-10 md:p-20 relative overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>

              <img
                src={image}
                alt={bookName}
                className="relative z-10 w-full rounded-2xl shadow-2xl transform hover:rotate-2 transition-transform duration-700 select-none"
              />
            </div>

            <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[4px] mb-6">
                <FaFeatherAlt /> Premium Edition
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                {bookName}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mb-10">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-xs">
                    {authorName?.[0]}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-bold text-sm">
                    {authorName}
                  </span>
                </div>
                <span className="text-slate-400 text-xs font-medium tracking-wide lowercase">
                  {authorEmail}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-10 border-y border-slate-100 dark:border-slate-800">
                <SpecItem icon={<FaLayerGroup />} label="Genre" value={genre} />
                <SpecItem
                  icon={<FaGlobe />}
                  label="Language"
                  value={language}
                />
                <SpecItem
                  icon={<FaBookOpen />}
                  label="Pages"
                  value={pageNumber}
                />
                <SpecItem
                  icon={<FaHashtag />}
                  label="Edition"
                  value={edition}
                />
                <SpecItem
                  icon={<FaLayerGroup />}
                  label="Category"
                  value={category}
                />
                <SpecItem icon={<FaHashtag />} label="Format" value={format} />
              </div>

              <div className="mt-10">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  Synopsis
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium italic opacity-80">
                  "{description}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Standard Price
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        status === "Available"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-rose-50 text-rose-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
                  >
                    <FaShoppingBasket size={18} /> Order Now
                  </button>
                  <button
                    onClick={() => handleWishList(book)}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all hover:shadow-lg active:scale-95"
                  >
                    <FaHeart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <BookRating book={book} />
        </div>
      </div>

      <BookOrderModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
      />
    </div>
  );
};

const SpecItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 opacity-70">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-[2px]">
        {label}
      </span>
    </div>
    <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
      {value || "N/A"}
    </span>
  </div>
);

export default BookDetails;

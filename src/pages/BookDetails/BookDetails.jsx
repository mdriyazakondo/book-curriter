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
      userEmail: user.email,
      userName: user.displayName,
      bookName: books.bookName,
      image: books.image,
      authorName: books.authorName,
      authorEmail: books.authorEmail,
    };

    try {
      const res = await axiosSecure.post(`/wish-list`, bookWishListData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added to Wishlist!",
          text: "We've saved this book for you.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        navigate("/dashboard/wish-list");
      } else {
        Swal.fire({
          title: "Already There!",
          text: "This book is already in your wishlist.",
          icon: "info",
          confirmButtonColor: "#0f172a",
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to add to wishlist.", "error");
    }
  };

  if (isLoading) return <Loading />;

  const {
    bookName,
    authorName,
    authorEmail,
    isbn,
    publisher,
    pageNumber,
    language,
    genre,
    price,
    stockQuantity,
    edition,
    format,
    category,
    status,
    description,
    image,
    create_date,
  } = book;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in fade-in duration-1000">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Cinematic Image Section */}
            <div className="lg:col-span-5 bg-slate-900 flex items-center justify-center p-12 relative overflow-hidden">
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
              <img
                src={image}
                alt={bookName}
                className="relative z-10 w-full max-h-[500px] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Side: Information Section */}
            <div className="lg:col-span-7 p-8 md:p-14 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[3px] mb-4">
                <FaBookOpen /> Book Discovery
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {bookName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    {authorName?.[0]}
                  </div>
                  <span className="text-slate-600 font-bold">{authorName}</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <span className="text-slate-400 text-sm font-medium">
                  {authorEmail}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-slate-50">
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

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                  Description
                </h3>
                <p className="text-slate-500 leading-relaxed text-lg italic">
                  "{description}"
                </p>
              </div>

              {/* Pricing & Status */}
              <div className="flex items-center justify-between mt-10 p-6 bg-slate-50 rounded-3xl">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Selling Price
                  </p>
                  <span className="text-4xl font-black text-slate-900">
                    ${price}
                  </span>
                </div>
                <span
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    status === "Available"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-rose-50 text-rose-500 border-rose-100"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  <FaShoppingBasket size={18} /> Order Now
                </button>

                <button
                  onClick={() => handleWishList(book)}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-emerald-500 hover:text-emerald-600 text-slate-900 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  <FaHeart size={18} /> Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
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
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-slate-300">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-sm font-bold text-slate-800">{value}</span>
  </div>
);

export default BookDetails;

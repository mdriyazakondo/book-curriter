import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaQuoteLeft, FaPenNib, FaCheckCircle } from "react-icons/fa";

const BookRating = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", book._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review/${book._id}`);
      return res.data;
    },
  });

  const handleRating = async () => {
    if (!rating || !reviewText.trim()) {
      Swal.fire({
        title: "Missing Details",
        text: "Please select stars and write a review.",
        icon: "warning",
        confirmButtonColor: "#10b981",
      });
      return;
    }

    const ratingData = {
      name: user.displayName,
      email: user.email,
      message: reviewText,
      rating,
      bookId: book._id,
      date: new Date(),
    };

    const res = await axiosSecure.post("/review", ratingData);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Review Published!",
        text: "Thank you for sharing your thoughts.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setRating(0);
      setReviewText("");
      refetch();
    }
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Reader <span className="text-emerald-600">Reviews</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Submit Review Form (Left/Top) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm sticky top-24">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[3px] mb-6">
              <FaPenNib /> Write a Review
            </div>

            <div className="flex items-center gap-2 mb-6 bg-slate-50 p-4 rounded-2xl justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-all transform hover:scale-125 ${
                    rating >= star
                      ? "text-emerald-500 shadow-emerald-200"
                      : "text-slate-200"
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            <textarea
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-300 mb-4 outline-none"
              placeholder="How was your reading experience?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />

            <button
              onClick={handleRating}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Post Review
            </button>
          </div>
        </div>

        {/* Display Reviews (Right/Bottom) */}
        <div className="lg:col-span-7 space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <FaQuoteLeft className="mx-auto text-slate-200 text-4xl mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">
                No reviews yet. Be the first to start the conversation!
              </p>
            </div>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white p-6 rounded-[24px] border border-slate-50 hover:border-emerald-100 transition-all group shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      {r.name?.[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                        {r.name}{" "}
                        <FaCheckCircle
                          className="text-emerald-500 text-[10px]"
                          title="Verified Reader"
                        />
                      </h4>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                        {new Date(r.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-[10px] ${
                          i < r.rating ? "text-emerald-500" : "text-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative pl-6">
                  <FaQuoteLeft className="absolute left-0 top-0 text-slate-100 text-xl" />
                  <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                    {r.message || r.reviewText}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookRating;

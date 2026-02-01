import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaQuoteLeft,
  FaPenNib,
  FaCheckCircle,
  FaComments,
} from "react-icons/fa";
import {
  useCreateReviewMutation,
  useMyReviewsQuery,
} from "../../redux/features/reviews/reviewApi";

const BookRating = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [createReview] = useCreateReviewMutation();
  const { data: reviews = [] } = useMyReviewsQuery(book?._id);

  const handleRating = async () => {
    if (!rating || !reviewText.trim()) {
      Swal.fire({
        title: "Missing Details",
        text: "Please select stars and write a review.",
        icon: "warning",
        confirmButtonColor: "#10b981",
        background: document.documentElement.classList.contains("dark")
          ? "#0f172a"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      });
      return;
    }

    const ratingData = {
      name: user?.displayName,
      email: user?.email,
      message: reviewText,
      rating,
      bookId: book._id,
      date: new Date(),
    };

    try {
      const res = await createReview(ratingData).unwrap();
      if (res?.insertedId) {
        Swal.fire({
          title: "Review Published!",
          text: "Thank you for sharing your thoughts.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          background: document.documentElement.classList.contains("dark")
            ? "#0f172a"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        });
        setRating(0);
        setReviewText("");
      }
    } catch (error) {
      Swal.fire("Error", "Could not post review", "error");
    }
  };

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 pb-20">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[4px] mb-2">
          <FaComments /> Community Feedback
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Reader{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Reviews
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[3px] mb-8">
              <FaPenNib className="text-emerald-500" /> Share Your Opinion
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-3 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`text-3xl transition-all transform duration-300 ${
                      (hover || rating) >= star
                        ? "text-emerald-500 scale-110 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        : "text-slate-200 dark:text-slate-700 hover:scale-105"
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                {rating > 0 ? `Rating: ${rating}/5` : "Tap to rate"}
              </p>
            </div>

            <textarea
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl p-5 text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 mb-6 outline-none resize-none"
              placeholder="What did you love (or hate) about this book?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
            />

            <button
              onClick={handleRating}
              className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black uppercase tracking-[2px] text-[11px] py-5 rounded-2xl transition-all shadow-lg active:scale-95"
            >
              Submit My Review
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {reviews.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaQuoteLeft className="text-slate-200 dark:text-slate-600 text-2xl" />
              </div>
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[2px] text-xs">
                No conversations yet
              </p>
              <p className="text-[10px] text-slate-300 mt-2">
                Be the first to leave a mark on this story.
              </p>
            </div>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white dark:bg-slate-900/40 p-8 rounded-[40px] border border-slate-50 dark:border-slate-800/50 hover:border-emerald-100 dark:hover:border-emerald-500/30 transition-all group hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-none"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[18px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 font-black text-lg group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      {r.name?.[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        {r.name}
                        <FaCheckCircle
                          className="text-emerald-500 text-[10px]"
                          title="Verified Reader"
                        />
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                        {new Date(r.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-[10px] ${
                          i < r.rating
                            ? "text-emerald-500"
                            : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium italic opacity-90 group-hover:opacity-100 transition-opacity">
                    "{r.message || r.reviewText}"
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

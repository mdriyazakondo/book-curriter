import { FaQuoteLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
  const {
    user_photoURL,
    userName,
    user_email,
    review: reviewText,
    ratings,
    date,
  } = review;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Emerald colored stars
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={`inline ${
        i < Math.round(ratings) ? "text-emerald-500" : "text-slate-200"
      }`}
    />
  ));

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
      {/* Top Section: Quote & Stars */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-emerald-600">
          <FaQuoteLeft className="text-emerald-600 text-xl transition-colors group-hover:text-white" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-0.5 mb-1">{stars}</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Verified Review
          </span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-8">
        "
        {reviewText?.length > 150
          ? reviewText.slice(0, 150) + "..."
          : reviewText}
        "
      </p>

      {/* Bottom Profile Section */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
        <div className="relative">
          <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img
            className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            src={user_photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
            alt={userName}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-900 leading-none mb-1">
            {userName}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
            {user_email}
          </p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-tighter">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

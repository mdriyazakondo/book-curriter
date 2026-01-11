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
      className={`inline text-xs ${
        i < Math.round(ratings)
          ? "text-emerald-500"
          : "text-slate-200 dark:text-slate-700"
      }`}
    />
  ));

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-emerald-900/10 transition-all duration-300 group">
      {/* Top Section: Quote & Stars */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-600 group-hover:rotate-12">
          <FaQuoteLeft className="text-emerald-600 dark:text-emerald-400 text-xl transition-colors group-hover:text-white" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-0.5 mb-1">{stars}</div>
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] italic">
            Verified Review
          </span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed italic mb-8 min-h-[80px]">
        "
        {reviewText?.length > 150
          ? reviewText.slice(0, 150) + "..."
          : reviewText}
        "
      </p>

      {/* Bottom Profile Section */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-800/60">
        <div className="relative">
          {/* Avatar Glow */}
          <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500"></div>
          <img
            className="relative w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
            src={user_photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
            alt={userName}
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {userName}
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
            {user_email}
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-black mt-1 uppercase tracking-widest">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

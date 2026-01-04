import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

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
        title: "Please provide a rating and a review!",
        icon: "warning",
        draggable: true,
      });
      return;
    }

    const ratingData = {
      name: user.displayName,
      email: user.email,
      message: reviewText,
      rating,
      bookId: book._id,
    };

    const res = await axiosSecure.post("/review", ratingData);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Thank you for your review!",
        icon: "success",
        draggable: true,
      });
      setRating(0);
      setReviewText("");
      refetch();
    } else {
      Swal.fire({
        title: "Something went wrong. Please try again.",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Reviews & Ratings</h2>

      {/* Submit Review Form */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-gray-700">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl transition-colors ${
                rating >= star
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
        />
        <button
          onClick={handleRating}
          className="bg-purple-600 text-white py-2 px-5 rounded-md hover:bg-purple-700 transition-color cursor-pointer"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-center">
            No reviews yet. Be the first to review!
          </p>
        )}
        {reviews.map((r) => (
          <div
            key={r._id || r.date}
            className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">
                {r.name || r.userName}
              </span>
              <span className="text-purple-400">
                {"★".repeat(r.rating)}{" "}
                <span className="text-gray-300">
                  {"★".repeat(5 - r.rating)}
                </span>
              </span>
            </div>
            <p className="text-gray-700 mb-2">{r.message || r.reviewText}</p>
            <small className="text-gray-400">
              {new Date(r.date).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRating;

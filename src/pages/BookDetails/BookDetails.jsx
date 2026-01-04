import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BookRating from "../../components/BookRaring/BookRating";
import BookOrderModal from "../../components/Dashboard/Modal/BookOrderModal";
import { useState } from "react";

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
          title: "Added!",
          text: "Book added to your wishlist successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/dashboard/wish-list");
      } else {
        Swal.fire({
          title: "Already Added!",
          text: "This book is already in your wishlist.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
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
    <div className="pt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl border border-purple-200">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side — Details */}
          <div className="flex justify-center items-center p-6 bg-white rounded-r-xl border-l border-purple-100">
            <img
              src={image}
              alt={bookName}
              className="w-full max-h-[550px] object-contain rounded-lg"
            />
          </div>
          {/* Right Side — Large Image */}
          <div className="p-8 space-y-4 bg-purple-50 rounded-l-xl">
            <h1 className="text-3xl font-bold text-purple-700">{bookName}</h1>
            <p className="text-lg text-purple-600 mb-2">
              <span className="font-semibold">By:</span> {authorName}
            </p>
            <p className=" text-purple-600 mb-2">
              <span className="font-semibold">Author Email:</span> {authorEmail}
            </p>

            <div className="grid grid-cols-2 gap-3 text-purple-800 text-sm">
              <p>
                <strong>Genre:</strong> {genre}
              </p>
              <p>
                <strong>Language:</strong> {language}
              </p>
              <p>
                <strong>Pages:</strong> {pageNumber}
              </p>
              <p>
                <strong>Edition:</strong> {edition}
              </p>
              <p>
                <strong>Format:</strong> {format}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Publisher:</strong> {publisher}
              </p>
              <p>
                <strong>Year:</strong> {new Date(create_date).getFullYear()}
              </p>
              <p>
                <strong>ISBN:</strong> {isbn}
              </p>
              <p>
                <strong>Stock Quantity:</strong> {stockQuantity}
              </p>
            </div>

            <p className="text-purple-700 mt-3">
              <strong>Description:</strong> {description}
            </p>

            <div className="flex items-center justify-between mt-6">
              <span className="text-3xl font-bold text-purple-700">
                ${price}
              </span>

              <span
                className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${
                  status === "Available" ? "bg-purple-600" : "bg-red-500"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full mt-5 cursor-pointer bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
              >
                <span> Order Now</span>
                <BookOrderModal
                  isOpen={isOpen}
                  closeModal={() => setIsOpen(false)}
                  book={book}
                />
              </button>{" "}
              <button
                onClick={() => handleWishList(book)}
                className="w-full mt-5 cursor-pointer bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
              >
                Wish List
              </button>
            </div>
          </div>
        </div>
      </div>
      <BookRating book={book} />
    </div>
  );
};

export default BookDetails;

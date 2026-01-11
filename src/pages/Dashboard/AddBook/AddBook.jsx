import React from "react";
import { useForm } from "react-hook-form";
import {
  FaBook,
  FaUser,
  FaCalendarAlt,
  FaLanguage,
  FaDollarSign,
  FaFileAlt,
  FaImage,
  FaLayerGroup,
  FaSortNumericDown,
} from "react-icons/fa";
import { imageUpload } from "../../../utils";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const handleBookAdd = async (data) => {
    try {
      Swal.fire({
        title: "Processing...",
        text: "Uploading cover and saving book details",
        allowOutsideClick: false,
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
        },
        didOpen: () => Swal.showLoading(),
      });

      const image = await imageUpload(data.bookCover[0]);

      const bookData = {
        ...data,
        authorEmail: user.email,
        image,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity),
        pageNumber: parseInt(data.pageNumber),
        publishedYear: parseInt(data.publishedYear),
      };

      delete bookData.bookCover;

      const res = await axiosSecure.post("/books", bookData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Book Added!",
          text: "The new title has been added to the library.",
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
          },
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Add New{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Masterpiece
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Expand the library collection with new titles.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
        <form
          onSubmit={handleSubmit(handleBookAdd)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <InputField
            label="Book Name"
            icon={<FaBook />}
            name="bookName"
            register={register}
            placeholder="e.g. The Great Gatsby"
          />

          <InputField
            label="Author Name"
            icon={<FaUser />}
            name="authorName"
            register={register}
            defaultValue={user?.displayName}
          />

          <InputField
            label="ISBN Number"
            icon={<FaFileAlt />}
            name="isbn"
            register={register}
            placeholder="13-digit ISBN"
          />

          <InputField
            label="Publisher"
            icon={<FaUser />}
            name="publisher"
            register={register}
            placeholder="Publishing house name"
          />

          <InputField
            label="Published Year"
            icon={<FaCalendarAlt />}
            name="publishedYear"
            type="number"
            register={register}
            placeholder="YYYY"
          />

          <InputField
            label="Page Count"
            icon={<FaSortNumericDown />}
            name="pageNumber"
            type="number"
            register={register}
            placeholder="Total pages"
          />

          <InputField
            label="Language"
            icon={<FaLanguage />}
            name="language"
            register={register}
            placeholder="e.g. English, Bengali"
          />

          <InputField
            label="Genre"
            icon={<FaLayerGroup />}
            name="genre"
            register={register}
            placeholder="e.g. Fiction, History"
          />

          <InputField
            label="Price ($)"
            icon={<FaDollarSign />}
            name="price"
            type="number"
            register={register}
            placeholder="0.00"
          />

          <InputField
            label="Stock Quantity"
            icon={<FaSortNumericDown />}
            name="stockQuantity"
            type="number"
            register={register}
            placeholder="Available copies"
          />

          <InputField
            label="Edition"
            icon={<FaFileAlt />}
            name="edition"
            register={register}
            placeholder="e.g. 1st Edition"
          />

          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <FaLayerGroup className="text-emerald-500 dark:text-emerald-400" />{" "}
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
              defaultValue="published"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <FaImage className="text-emerald-500 dark:text-emerald-400" />{" "}
              Book Cover Image
            </label>
            <div className="relative group">
              <input
                {...register("bookCover", { required: true })}
                type="file"
                className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-slate-900 dark:file:bg-emerald-600 file:text-white hover:file:bg-emerald-600 dark:hover:file:bg-emerald-500 transition-all cursor-pointer bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-4"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 block">
              Book Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              placeholder="Write a brief summary of the book..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-[24px] px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white font-black uppercase tracking-[3px] py-5 rounded-[24px] shadow-lg shadow-emerald-100 dark:shadow-none transition-all duration-300 active:scale-[0.98]"
            >
              Confirm & Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  icon,
  name,
  register,
  type = "text",
  placeholder,
  defaultValue,
}) => (
  <div className="flex flex-col">
    <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
      <span className="text-emerald-500 dark:text-emerald-400">{icon}</span>{" "}
      {label}
    </label>
    <input
      type={type}
      {...register(name, { required: true })}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
    />
  </div>
);

export default AddBook;

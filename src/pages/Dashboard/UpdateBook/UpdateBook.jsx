import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaBook,
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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading/Loading";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data: updateBooks = {}, isLoading } = useQuery({
    queryKey: ["updateBooks", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/update-book/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (updateBooks) {
      reset(updateBooks);
    }
  }, [updateBooks, reset]);

  const handleBookUpdate = async (data) => {
    try {
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we save your changes.",
        allowOutsideClick: false,
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
        },
        didOpen: () => Swal.showLoading(),
      });

      let imageUrl = updateBooks.image;

      if (data.bookCover && data.bookCover[0]) {
        imageUrl = await imageUpload(data.bookCover[0]);
      }

      const bookData = {
        ...data,
        image: imageUrl,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity),
        pageNumber: parseInt(data.pageNumber),
        publishedYear: parseInt(data.publishedYear),
      };

      delete bookData.bookCover;
      delete bookData._id;

      const res = await axiosSecure.put(`/books/${id}`, bookData);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Successfully Updated!",
          text: `${data.bookName} has been modified.`,
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
          },
        });
        navigate("/dashboard/my-books");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update book details.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white rounded-[24px]",
        },
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Edit{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Book Details
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 tracking-tight">
          Modify the information for:{" "}
          <span className="text-slate-800 dark:text-slate-200 font-bold">
            {updateBooks.bookName}
          </span>
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
        <form
          onSubmit={handleSubmit(handleBookUpdate)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <InputField
            label="Book Name"
            icon={<FaBook />}
            name="bookName"
            register={register}
            defaultValue={updateBooks.bookName}
          />

          <InputField
            label="ISBN Number"
            icon={<FaFileAlt />}
            name="isbn"
            register={register}
            defaultValue={updateBooks.isbn}
          />

          <InputField
            label="Publisher"
            icon={<FaBook />}
            name="publisher"
            register={register}
            defaultValue={updateBooks.publisher}
          />

          <InputField
            label="Published Year"
            icon={<FaCalendarAlt />}
            name="publishedYear"
            type="number"
            register={register}
            defaultValue={updateBooks.publishedYear}
          />

          <InputField
            label="Page Count"
            icon={<FaSortNumericDown />}
            name="pageNumber"
            type="number"
            register={register}
            defaultValue={updateBooks.pageNumber}
          />

          <InputField
            label="Language"
            icon={<FaLanguage />}
            name="language"
            register={register}
            defaultValue={updateBooks.language}
          />

          <InputField
            label="Genre"
            icon={<FaLayerGroup />}
            name="genre"
            register={register}
            defaultValue={updateBooks.genre}
          />

          <InputField
            label="Price ($)"
            icon={<FaDollarSign />}
            name="price"
            type="number"
            register={register}
            defaultValue={updateBooks.price}
          />

          <InputField
            label="Stock Quantity"
            icon={<FaSortNumericDown />}
            name="stockQuantity"
            type="number"
            register={register}
            defaultValue={updateBooks.stockQuantity}
          />

          <InputField
            label="Edition"
            icon={<FaFileAlt />}
            name="edition"
            register={register}
            defaultValue={updateBooks.edition}
          />

          <InputField
            label="Format"
            icon={<FaLayerGroup />}
            name="format"
            register={register}
            defaultValue={updateBooks.format}
          />

          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <FaLayerGroup className="text-emerald-500 dark:text-emerald-400" />{" "}
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
              defaultValue={updateBooks.status}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
              <img
                src={updateBooks.image}
                alt="Current Cover"
                className="w-16 h-20 object-cover rounded-lg shadow-sm ring-1 ring-emerald-200 dark:ring-emerald-800"
              />
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                  Current Cover
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium">
                  Select a new file below to replace this image
                </p>
              </div>
            </div>

            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <FaImage className="text-emerald-500 dark:text-emerald-400" />{" "}
              Replace Cover Image
              <span className="text-[10px] opacity-60 font-medium">
                (Optional)
              </span>
            </label>
            <input
              {...register("bookCover")}
              type="file"
              className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-slate-900 dark:file:bg-emerald-600 file:text-white hover:file:bg-emerald-600 transition-all cursor-pointer bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-4"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-2 ml-1 block">
              Book Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              defaultValue={updateBooks.description}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-[24px] px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white font-black uppercase tracking-[3px] py-5 rounded-[24px] shadow-lg shadow-emerald-100 dark:shadow-none transition-all duration-300 active:scale-[0.98]"
            >
              Save Changes
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
      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
    />
  </div>
);

export default UpdateBook;

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaBook,
} from "react-icons/fa";

const BookOrderModal = ({ isOpen, closeModal, book }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
    },
  });

  const handleOrder = async (data) => {
    if (!user) return navigate("/login");

    const bookOrderData = {
      image: book?.image,
      bookName: book?.bookName,
      authorName: book?.authorName,
      authorEmail: book?.authorEmail,
      price: book?.price,
      customerName: data.name,
      customerEmail: data.email,
      customerPhoneNumber: data.number,
      customerAddress: data.address,
      quantity: 1,
      orderDate: new Date(),
    };

    Swal.fire({
      title: "Confirm Order?",
      text: `Order for "${book?.bookName}" at $${book?.price}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Confirm Order",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post(`/orders`, bookOrderData);
          if (res.data?.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Redirecting to payment...",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            closeModal();

            if (res.data.url) {
              window.location.replace(res.data.url);
            } else {
              navigate("/dashboard/my-orders");
            }
          }
        } catch (error) {
          Swal.fire("Error!", "Order placement failed.", "error");
        }
      }
    });
  };

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 p-8 text-left align-middle shadow-2xl transition-all border border-slate-100 dark:border-slate-800">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-black leading-6 text-slate-900 dark:text-white mb-2 flex items-center gap-2"
                >
                  Confirm Order
                </DialogTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                  Check your delivery details below.
                </p>

                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
                  <img
                    src={book?.image}
                    alt=""
                    className="w-12 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                      Selected Item
                    </p>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {book?.bookName}
                    </h4>
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      ${book?.price}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(handleOrder)}
                  className="space-y-5"
                >
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      readOnly
                      {...register("name")}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none py-3.5 pl-10 pr-4 rounded-xl text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="email"
                      readOnly
                      {...register("email")}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none py-3.5 pl-10 pr-4 rounded-xl text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-4 text-slate-400 text-xs" />
                    <input
                      type="number"
                      placeholder="Phone Number"
                      {...register("number", {
                        required: "Phone number is required",
                      })}
                      className={`w-full bg-white dark:bg-slate-950 border py-3.5 pl-10 pr-4 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.number
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-700 focus:border-emerald-500"
                      }`}
                    />
                    {errors.number && (
                      <span className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                        {errors.number.message}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400 text-xs" />
                    <textarea
                      placeholder="Full Delivery Address"
                      rows="3"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={`w-full bg-white dark:bg-slate-950 border py-3.5 pl-10 pr-4 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 resize-none ${
                        errors.address
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-700 focus:border-emerald-500"
                      }`}
                    ></textarea>
                    {errors.address && (
                      <span className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-2 px-6 py-4 text-xs font-black uppercase tracking-widest text-white bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 rounded-2xl transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95"
                    >
                      Confirm & Pay
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookOrderModal;

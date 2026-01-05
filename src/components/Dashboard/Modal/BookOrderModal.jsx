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
    if (!user) {
      return navigate("/login");
    }

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
      title: "Are you sure?",
      text: "Do you want to place this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Order it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post(`/orders`, bookOrderData);

          if (res.data?.insertedId) {
            Swal.fire({
              title: "Order Placed!",
              text: "Your order has been saved successfully.",
              icon: "success",
            });
            closeModal();
            navigate("/dashboard/my-orders");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to place the order. Please try again.",
            icon: "error",
          });
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
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900 mb-4"
                >
                  Confirm Your Order
                </DialogTitle>

                <p className="text-sm text-gray-500 mb-4">
                  Book:{" "}
                  <span className="font-semibold text-green-600">
                    {book?.bookName}
                  </span>
                </p>

                <form
                  onSubmit={handleSubmit(handleOrder)}
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      readOnly
                      {...register("name")}
                      className="w-full border border-gray-200 py-2 px-3 bg-gray-100 rounded-md outline-none text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      readOnly
                      {...register("email")}
                      className="w-full border border-gray-200 py-2 px-3 bg-gray-100 rounded-md outline-none text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Enter Your Phone Number"
                      {...register("number", {
                        required: "Phone number is required",
                      })}
                      className={`w-full border py-2 px-3 rounded-md outline-none focus:border-green-500 ${
                        errors.number ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.number && (
                      <span className="text-red-500 text-xs">
                        {errors.number.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Enter Full Delivery Address"
                      rows="3"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={`w-full border py-2 px-3 rounded-md outline-none focus:border-green-500 ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    ></textarea>
                    {errors.address && (
                      <span className="text-red-500 text-xs">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors shadow-lg"
                    >
                      Place Order
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

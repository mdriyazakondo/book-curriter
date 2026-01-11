import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Swal from "sweetalert2";
import { useState, Fragment } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBookReader } from "react-icons/fa";

const BookModal = ({ isOpen, closeModal, bookId, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async () => {
    if (!updatedStatus) {
      return Swal.fire({
        title: "Heads Up!",
        text: "Please select a status before updating.",
        icon: "info",
        confirmButtonColor: "#10b981",
      });
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change visibility to ${updatedStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, Update Status",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/books/${bookId}`, {
        status: updatedStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Book visibility updated successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        refetch();
        closeModal();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
      console.error(error);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl transition-all border border-slate-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
                    <FaBookReader size={28} />
                  </div>
                  <DialogTitle className="text-2xl font-black text-slate-900">
                    Update <span className="text-emerald-600">Visibility</span>
                  </DialogTitle>
                  <p className="mt-2 text-sm text-slate-400 font-medium">
                    Manage how this book appears to customers.
                  </p>
                </div>

                <div className="mt-8">
                  <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 ml-1 mb-2 block">
                    Choose New Status
                  </label>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">Select an option</option>
                    <option value="published">Published (Visible)</option>
                    <option value="unpublished">Unpublished (Hidden)</option>
                  </select>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-emerald-600 hover:bg-slate-900 text-white font-black uppercase tracking-[2px] py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all duration-300 active:scale-[0.98]"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={closeModal}
                    className="w-full bg-white hover:bg-slate-50 text-slate-400 font-bold py-3 rounded-2xl transition-all"
                  >
                    Discard
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookModal;

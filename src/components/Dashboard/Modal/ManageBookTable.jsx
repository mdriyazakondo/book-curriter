import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Swal from "sweetalert2";
import React, { Fragment, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookModal = ({ isOpen, closeModal, bookId, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async () => {
    if (!updatedStatus)
      return Swal.fire({
        title: "Wait!",
        text: "Please select a status first.",
        icon: "info",
        confirmButtonColor: "#10b981",
      });

    const confirm = await Swal.fire({
      title: "Confirm Change?",
      text: `Update status to ${updatedStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#94a3b8",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/books/${bookId}`, {
        status: updatedStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Status has been successfully changed.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        closeModal();
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
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
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 p-8 text-left align-middle shadow-2xl border border-slate-100 dark:border-slate-800 transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl font-black leading-6 text-slate-900 dark:text-white tracking-tight text-center"
                >
                  Manage <span className="text-emerald-600">Visibility</span>
                </DialogTitle>

                <div className="mt-8">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] mb-2 block ml-1">
                    Select New Visibility Status
                  </label>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-bold text-sm cursor-pointer appearance-none shadow-sm mb-2"
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="Available">Mark as Published</option>
                    <option value="Unpublished">Mark as Unpublished</option>
                  </select>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-1 italic font-medium">
                    * This will update how users see this book in the library.
                  </p>
                </div>

                <div className="flex mt-10 flex-col gap-3">
                  <button
                    onClick={handleUpdate}
                    type="button"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                  >
                    Confirm Status Update
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                    onClick={closeModal}
                  >
                    Discard Changes
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

export default ManageBookModal;

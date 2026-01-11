import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role);
  const axiosSecure = useAxiosSecure();

  // ইউজার পরিবর্তন হলে যেন ড্রপডাউন ভ্যালু আপডেট হয়
  useEffect(() => {
    if (user?.role) setUpdatedRole(user.role);
  }, [user]);

  const handleUpdateRole = async () => {
    try {
      const { data } = await axiosSecure.patch(`/user-role`, {
        email: user?.email,
        role: updatedRole,
      });

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Role updated to ${updatedRole}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
          },
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not update role.",
        icon: "error",
      });
    } finally {
      closeModal();
    }
  };

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        {/* Overlay with glassmorphism */}
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  className="text-xl font-black leading-6 text-slate-900 dark:text-white tracking-tight"
                >
                  Modify User{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Permissions
                  </span>
                </DialogTitle>

                <div className="mt-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 mb-6">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                      Target Account
                    </p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] mb-2 block ml-1">
                    Assign New Role
                  </label>
                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-bold text-sm cursor-pointer appearance-none shadow-sm"
                  >
                    <option value="customer">Customer</option>
                    <option value="Librarian">Librarian</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="flex mt-8 justify-end gap-3">
                  <button
                    type="button"
                    className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateRole}
                    type="button"
                    className="bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white dark:text-slate-900 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
                  >
                    Update Now
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

export default UpdateRoleModal;

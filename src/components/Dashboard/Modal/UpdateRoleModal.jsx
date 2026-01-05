import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role);
  const axiosSecure = useAxiosSecure();

  const handleUpdateRole = async () => {
    try {
      const { data } = await axiosSecure.patch(`/user-role`, {
        email: user?.email,
        role: updatedRole,
      });

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: `User role has been updated to ${updatedRole}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the role.",
        icon: "error",
      });
    } finally {
      closeModal();
    }
  };

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* ব্যাকগ্রাউন্ড আবছা করার জন্য ওভারলে */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
                  className="text-lg font-bold leading-6 text-gray-900 border-b pb-2"
                >
                  Update User Role
                </DialogTitle>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Updating role for:{" "}
                    <span className="font-semibold text-gray-800">
                      {user?.email}
                    </span>
                  </p>

                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    name="role"
                  >
                    <option value="customer">Customer</option>
                    <option value="Librarian">Librarian</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex mt-6 justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors cursor-pointer"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateRole}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors cursor-pointer shadow-md"
                  >
                    Update Role
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

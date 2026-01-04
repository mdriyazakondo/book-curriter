import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookModal = ({ isOpen, closeModal, bookId, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState("");
  const axiosSecure = useAxiosSecure();
  const handleUpdate = async () => {
    if (!updatedStatus)
      return Swal.fire("Error!", "Please select a status", "error");

    const confirm = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to change book status?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/books/${bookId}`, {
        status: updatedStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Book status updated.", "success");
        refetch();
        closeModal();
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/30">
        <DialogPanel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
          <DialogTitle className="text-lg font-semibold">
            Update Book Status
          </DialogTitle>

          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            className="w-full p-3 mt-4 border rounded-xl"
          >
            <option value="">Select Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleUpdate}
              className="bg-purple-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ManageBookModal;

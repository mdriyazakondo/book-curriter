import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ManageBookTable from "../../../../components/Dashboard/ManageBookTable/ManageBookTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../shared/Loading/Loading";

const ManageBook = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mange-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mange-books`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently removed from the inventory.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[24px]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/books/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Book has been removed successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not delete the book.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">
          Global <span className="text-emerald-600">Inventory</span>
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Monitor and manage all books across the platform.
        </p>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Cover
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Book Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Author
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Added Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Price
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Lang
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {books?.map((book) => (
                <ManageBookTable
                  key={book._id}
                  book={book}
                  refetch={refetch}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[32px] mt-6 border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            No books available in the inventory
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageBook;

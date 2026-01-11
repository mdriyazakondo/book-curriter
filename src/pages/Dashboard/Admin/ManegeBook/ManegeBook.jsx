import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ManageBookTable from "../../../../components/Dashboard/ManageBookTable/ManageBookTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../shared/Loading/Loading";
import { FaBookOpen } from "react-icons/fa";

const ManageBook = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-books"],
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
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
      customClass: {
        popup: "rounded-[32px] border border-slate-100 dark:border-slate-800",
        confirmButton:
          "rounded-xl px-6 py-3 font-bold uppercase text-xs tracking-widest",
        cancelButton:
          "rounded-xl px-6 py-3 font-bold uppercase text-xs tracking-widest",
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
          background: document.documentElement.classList.contains("dark")
            ? "#0f172a"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
          customClass: { popup: "rounded-[32px]" },
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[3px] mb-2">
            <FaBookOpen /> Inventory Assets
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Global{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Inventory
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
            Monitor and manage all books across the platform.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            Total: {books.length} Books
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Cover
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Book Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Author
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Added Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                  Price
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Lang
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
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

        {/* Empty State Inside Table */}
        {books.length === 0 && (
          <div className="text-center py-32 bg-white dark:bg-slate-900">
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-xs">
              No books available in the inventory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBook;

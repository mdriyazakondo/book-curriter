import MyBookTable from "../../../components/Dashboard/TableRow/MyBookTable";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading/Loading";
import {
  useDeleteBooksMutation,
  useMyAllBooksQuery,
} from "../../../redux/features/books/bookApi";

const MyBook = () => {
  const { user } = useAuth();

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBooksMutation();

  const { data: books = [], isLoading } = useMyAllBooksQuery(user?.email);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove the book from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[24px] dark:bg-slate-800 dark:text-white",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await deleteBook(id).unwrap();
      if (res?.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "The book has been successfully removed.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not remove the book. Please try again.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
        customClass: {
          popup: "rounded-[24px] dark:bg-slate-800 dark:text-white",
        },
      });
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            My{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Library
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage your personally added book collections.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 px-5 py-2 rounded-2xl">
          <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            Total Books: <span className="text-lg ml-1">{books.length}</span>
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                {[
                  { label: "Cover", center: true },
                  { label: "Book Name" },
                  { label: "Author" },
                  { label: "Added On", center: true },
                  { label: "Price" },
                  { label: "Lang", center: true },
                  { label: "Status", center: true },
                  { label: "Actions", right: true },
                ].map((th, i) => (
                  <th
                    key={i}
                    className={`px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ${
                      th.center ? "text-center" : th.right ? "text-right" : ""
                    }`}
                  >
                    {th.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {books?.map((book) => (
                <MyBookTable
                  key={book._id}
                  book={book}
                  handleDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-4xl mt-6 border border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-slate-300 dark:text-slate-700 text-5xl mb-4 flex justify-center">
            📚
          </div>
          <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-xs">
            You haven't added any books yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBook;

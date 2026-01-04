import { useQuery } from "@tanstack/react-query";
import MyBookTable from "../../../components/Dashboard/TableRow/MyBookTable";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-books/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id, refetch) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove the book from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", 
      cancelButtonColor: "#f43f5e", 
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[24px]",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/books/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "The book has been successfully removed.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not remove the book. Please try again.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            My <span className="text-emerald-600">Library</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage your personally added book collections.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 px-5 py-2 rounded-2xl">
          <p className="text-emerald-700 font-bold text-sm">
            Total Books: <span className="text-lg ml-1">{books.length}</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Cover
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Book Name
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Author
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Added On
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Price
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Lang
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {books?.map((book) => (
                <MyBookTable
                  key={book._id}
                  book={book}
                  refetch={refetch}
                  handleDelete={(id) => handleDelete(id, refetch)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[32px] mt-6 border border-dashed border-slate-200">
          <div className="text-slate-300 text-5xl mb-4 flex justify-center">
            📚
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            You haven't added any books yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBook;

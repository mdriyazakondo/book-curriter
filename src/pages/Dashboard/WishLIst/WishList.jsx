import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading/Loading";
import Swal from "sweetalert2";
import {
  FaTrashAlt,
  FaHeart,
  FaRegCalendarAlt,
  FaUserEdit,
} from "react-icons/fa";

const WishList = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: wishLists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishLists"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wish-list`);
      return res.data;
    },
  });

  const handleWishListDelete = async (id) => {
    const result = await Swal.fire({
      title: "Remove from Wishlist?",
      text: "This book will be removed from your saved items.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Emerald 500
      cancelButtonColor: "#f43f5e", // Rose 500
      confirmButtonText: "Yes, remove it!",
      customClass: {
        popup: "rounded-[24px]",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/wish-list/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Removed!",
            text: "Book removed successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to remove the book.", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[3px] mb-2">
          <FaHeart className="animate-pulse" /> Curated Collection
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          My <span className="text-emerald-600">Wishlist</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Manage the books you've saved for future reading.
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  No.
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-left">
                  Book Info
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-left">
                  Author Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Added Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[2px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {wishLists.length > 0 ? (
                wishLists.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-slate-300">
                        #{index + 1}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.bookName}
                          className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">
                            {item.bookName}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            Ref ID: {item._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">
                          {item.authorName}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <FaUserEdit size={10} /> {item.authorEmail}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center text-slate-500">
                        <FaRegCalendarAlt
                          size={12}
                          className="mb-1 opacity-40"
                        />
                        <span className="text-[11px] font-bold uppercase tracking-tighter">
                          {item.wishList_date
                            ? new Date(item.wishList_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleWishListDelete(item._id)}
                        className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all hover:rotate-12"
                        title="Delete from Wishlist"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                        <FaHeart size={30} className="opacity-20" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Your wishlist is empty
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishList;

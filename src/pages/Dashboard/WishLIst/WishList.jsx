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
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, remove it!",
      customClass: {
        popup:
          "rounded-[24px] dark:bg-slate-900 dark:text-white border border-slate-100 dark:border-slate-800",
        title: "dark:text-white",
        htmlContainer: "dark:text-slate-400",
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
            customClass: {
              popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
            },
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to remove the book.",
          icon: "error",
          customClass: {
            popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
          },
        });
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-10 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[3px] mb-2">
          <FaHeart className="animate-pulse" /> Curated Collection
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          My{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Wishlist
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
          Manage the books you've saved for future reading.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  No.
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-left">
                  Book Info
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-left">
                  Author Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Added Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {wishLists.length > 0 ? (
                wishLists.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.bookName}
                          className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform ring-1 ring-slate-100 dark:ring-slate-800"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.bookName}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                            Ref ID: {item._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {item.authorName}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <FaUserEdit
                            size={10}
                            className="text-emerald-500/50"
                          />{" "}
                          {item.authorEmail}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
                        <FaRegCalendarAlt
                          size={12}
                          className="mb-1 opacity-40 text-emerald-500"
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
                        className="p-3 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all hover:rotate-12 active:scale-90"
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
                    <div className="flex flex-col items-center justify-center animate-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-500 rounded-full flex items-center justify-center mb-6 relative">
                        <FaHeart
                          size={40}
                          className="opacity-20 animate-ping absolute"
                        />
                        <FaHeart size={32} className="opacity-40" />
                      </div>
                      <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[3px] text-xs">
                        Wishlist is empty
                      </p>
                      <button className="mt-6 px-6 py-2 border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                        Explore Library
                      </button>
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

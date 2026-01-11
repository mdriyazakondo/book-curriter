import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCreditCard, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";

const OrderTableRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    bookName,
    authorName,
    customerName,
    customerEmail,
    price,
    status,
    paymentStatus,
    order_date,
    quantity,
    image,
  } = order;

  const handleCencelled = async (order) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, cancel it!",
      customClass: {
        popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
        title: "dark:text-white",
        htmlContainer: "dark:text-slate-400",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/order-cancelled/${order._id}`, {
        status: "cancelled",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Cancelled!",
          text: "Order has been cancelled.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
          },
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        customClass: {
          popup: "rounded-[24px] dark:bg-slate-900 dark:text-white",
        },
      });
    }
  };

  const handlePayment = async (payment) => {
    const paymentInfo = {
      name: payment.bookName,
      price: payment.price,
      customerEmail: payment.customerEmail,
      _id: payment._id,
      authorName: payment.authorName,
    };
    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-50 dark:border-slate-800 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={bookName}
            className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform ring-1 ring-slate-100 dark:ring-slate-700 bg-white dark:bg-slate-800"
          />
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
              {bookName}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {authorName}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {customerName}
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          {customerEmail}
        </p>
      </td>

      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            paymentStatus === "paid"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
              : "bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-100 dark:border-rose-500/20"
          }`}
        >
          {paymentStatus}
        </span>
      </td>

      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            status === "delivered"
              ? "bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-600"
              : status === "cancelled"
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700"
              : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-center">
        <p className="text-sm font-black text-slate-900 dark:text-white">
          ${price}
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
          Qty: {quantity}
        </p>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
          <FaCalendarAlt className="text-xs mb-1 opacity-40" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            {new Date(order_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={paymentStatus === "paid" || status === "cancelled"}
            onClick={() => handlePayment(order)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed shadow-sm active:scale-95"
          >
            <FaCreditCard size={12} /> Pay
          </button>

          <button
            onClick={() => handleCencelled(order)}
            disabled={paymentStatus === "paid" || status === "cancelled"}
            className="p-2.5 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group/cancel"
            title="Cancel Order"
          >
            <FaTimesCircle
              size={18}
              className="group-hover/cancel:scale-110 transition-transform"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;

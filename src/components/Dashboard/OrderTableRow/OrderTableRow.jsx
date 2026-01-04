import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCreditCard, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";

const OrderTableRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    name,
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

  // Cancel Handler
  const handleCencelled = async (order) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Emerald 500
      cancelButtonColor: "#f43f5e", // Rose 500
      confirmButtonText: "Yes, cancel it!",
      customClass: {
        popup: "rounded-[24px]",
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
        });
        refetch();
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // Payment Handler
  const handlePayment = async (payment) => {
    const paymentInfo = {
      name: payment.name,
      price: payment.price,
      customerEmail: payment.customerEmail,
      _id: payment._id,
      authorName: payment.authorName,
    };
    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      {/* Book Information (Combined) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 line-clamp-1">
              {name}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              {authorName}
            </p>
          </div>
        </div>
      </td>

      {/* Customer Info */}
      <td className="px-6 py-4 text-center">
        <p className="text-sm font-semibold text-slate-700">{customerName}</p>
        <p className="text-[10px] text-slate-400">{customerEmail}</p>
      </td>

      {/* Payment Status Badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            paymentStatus === "paid"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-rose-50 text-rose-500 border-rose-100"
          }`}
        >
          {paymentStatus}
        </span>
      </td>

      {/* Delivery Status Badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            status === "delivered"
              ? "bg-slate-900 text-white border-slate-900"
              : status === "cancelled"
              ? "bg-slate-100 text-slate-400 border-slate-200"
              : "bg-amber-50 text-amber-600 border-amber-100"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Price & Quantity */}
      <td className="px-6 py-4 text-center">
        <p className="text-sm font-black text-slate-900">${price}</p>
        <p className="text-[10px] text-slate-400 font-bold">Qty: {quantity}</p>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center text-slate-500">
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

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={paymentStatus === "paid" || status === "cancelled"}
            onClick={() => handlePayment(order)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-slate-900 text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm active:scale-95"
          >
            <FaCreditCard size={12} /> Pay
          </button>

          <button
            onClick={() => handleCencelled(order)}
            disabled={paymentStatus === "paid" || status === "cancelled"}
            className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-20 disabled:cursor-not-allowed group/cancel"
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

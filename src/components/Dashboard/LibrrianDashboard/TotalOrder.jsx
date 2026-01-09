import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingBasket } from "react-icons/fa"; // Icon ta change korechi order er sathe mil rekhe

const TotalOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orderPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}/payments`);
      return res.data;
    },
    enabled: !!user?.email, // User email thaklei query cholbe
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md hover:border-emerald-200 transition-all duration-300">
      {/* Icon Section */}
      <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
        <FaShoppingBasket size={24} />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Total Orders
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-slate-900">{orders.length}</p>
          <span className="text-[10px] text-slate-400 font-medium ml-1">
            Items
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalOrder;

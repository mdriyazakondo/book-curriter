import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { FaWallet } from "react-icons/fa"; // Investment-er jonno Wallet icon

const TotalInvest = () => {
  const { user, setIsLoadingLibrean } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orderPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}/payments`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) setIsLoadingLibrean(true);

  // Total investment calculation
  const totalSpent = orders.reduce(
    (acc, curr) => acc + (parseFloat(curr.price) || 0),
    0
  );

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md hover:border-blue-200 transition-all duration-300">
      {/* Icon Section - Investment er jonno Blue theme use kora hoyeche */}
      <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
        <FaWallet size={24} />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Total Investment
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-slate-900">$</span>
          <p className="text-2xl font-black text-slate-900">
            {totalSpent.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalInvest;

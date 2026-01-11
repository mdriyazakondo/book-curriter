import React, { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading/Loading";

const TotalBook = () => {
  const { user, setIsLoadingLibrean } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-books/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Loading state handling update
  useEffect(() => {
    setIsLoadingLibrean(isLoading);
  }, [isLoading, setIsLoadingLibrean]);

  if (isLoading) return null; // Parent handle korbe loading

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 group hover:shadow-md dark:hover:shadow-indigo-900/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300">
      {/* Icon Section - Indigo theme */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white dark:group-hover:text-white transition-colors duration-300 shadow-sm">
        <FaBookOpen size={22} />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Total Books
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {books?.length || 0}
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium ml-1">
            Copies
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalBook;

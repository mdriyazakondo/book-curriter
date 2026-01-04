import { useQuery } from "@tanstack/react-query";
import React from "react";
import Container from "../../../shared/Container/Container";
import BookCard from "../../../shared/BookCard/BookCard";
import Loading from "../../../shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Latest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: latests = [], isLoading } = useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latest`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="py-16 bg-[#fcfdfe]">
      <Container>
        {/* Section Header Design */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-emerald-500"></span>
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs">
              Fresh Arrivals
            </span>
            <span className="w-8 h-0.5 bg-emerald-500"></span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 text-center mb-4">
            Latest & <span className="text-emerald-600 italic">Popular</span>{" "}
            Books
          </h2>

          <p className="text-slate-500 text-center max-w-xl text-sm md:text-base leading-relaxed">
            Explore our newest additions and all-time favorites. From
            bestsellers to hidden gems, find your next great read right here.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {latests?.map((latest, index) => (
            <div
              key={index}
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <BookCard latest={latest} />
            </div>
          ))}
        </div>

        {/* Bottom Action (Optional) */}
        <div className="mt-16 text-center">
          <Link
            to={"/all-books"}
            className="border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Latest;

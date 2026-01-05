import React from "react";
import { useNavigate } from "react-router";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="text-center">
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[200px] font-black text-green-100 leading-none">
            404
          </h1>
          <h2 className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-green-600 mt-8">
            Oops!
          </h2>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Page Not Found
          </h3>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95 cursor-pointer"
          >
            <HomeIcon className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 text-green-200 -z-10">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="currentColor" fillOpacity="0.1"/>
        </svg>
      </div>
    </div>
  );
};

export default ErrorPage;
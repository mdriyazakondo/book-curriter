import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-purple-50 px-4">
      <h1 className="text-9xl font-extrabold text-purple-600 animate-pulse">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mt-4">
        Page Not Found
      </h2>
      <p className="text-purple-600 mt-2 text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;

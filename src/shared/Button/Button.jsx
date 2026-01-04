import React from "react";
import { Link } from "react-router";

const Button = ({ title, links }) => {
  return (
    <div>
      <button className="py-2 px-4 bg-indigo-500 text-white rounded-sm">
        <Link to={`/${links}`}>{title}</Link>
      </button>
    </div>
  );
};

export default Button;

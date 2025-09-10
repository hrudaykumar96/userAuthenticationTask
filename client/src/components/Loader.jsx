import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <FaSpinner className="animate-spin text-indigo-600" size={40} />
      <span className="ml-3 text-indigo-600 font-medium text-lg">
        Loading...
      </span>
    </div>
  );
}

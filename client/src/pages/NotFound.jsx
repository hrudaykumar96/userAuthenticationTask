import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {

  useEffect(()=>{
    document.title = "MERN Task - Page Not Found"
  },[]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-r from-indigo-100 to-purple-100">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Go Home
      </NavLink>
    </div>
  );
}

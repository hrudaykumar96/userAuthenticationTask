import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaCheckCircle } from "react-icons/fa";

export default function Home() {
  const tasks = [
    "Create a Registration form",
    "User sign up with email confirmation",
    "Use sessions for security",
    "Create basic Dashboard",
    "Encrypt user information in DB",
    "Implement 2FA via email",
    "Allow users to edit their profiles",
  ];

  useEffect(() => {
    document.title = "MERN Task - Home";
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          MERN Stack Technical Test
        </h1>

        <ul className="space-y-3 mb-8">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center gap-3 bg-white shadow-sm rounded-lg px-4 py-2 border"
            >
              <FaCheckCircle className="text-green-500" />
              <span className="text-gray-700 font-medium">{task}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <NavLink
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <FaSignInAlt />
            Click to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}

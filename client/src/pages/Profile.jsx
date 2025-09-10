import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { fetchUserData, updateUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Loader from "../components/Loader";

export default function Profile() {
  useEffect(() => {
    document.title = "MERN Task - Profile";
  }, []);

  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await updateUser(values);
      if (response) {
        if (response.success) {
          setData({
            name: values.name,
            email: values.email,
          });
          setLoading(false);
          toast.success("Updated successfully");
        } else if (response.error) {
          setLoading(false);
          toast.error(response.error);
        }
      } else {
        setLoading(false);
        toast.error("Please try again later");
      }
    },
  });

  useEffect(() => {
    const fetchUserdata = async () => {
      setLoading(true);
      const response = await fetchUserData();
      if (response) {
        if (response.success) {
          setLoading(false);
          setData(response.success);
        } else if (response.error) {
          navigate("/login");
          setData(null);
          setLoading(false);
          toast.error(response.error);
        }
      } else {
        setData(null);
        setLoading(false);
        navigate("/login");
      }
    };
    fetchUserdata();
  }, [navigate]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("name", data.name || "");
      formik.setFieldValue("email", data.email || "");
    }
  }, [data]);

  if (loading) return <Loader />;

  if (!data) return <Login />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full transform transition duration-500 hover:scale-105 animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
          Welcome, {data?.name}!
        </h1>

        <h2 className="text-xl font-semibold text-indigo-600 mb-6 text-center">
          Update Your Profile
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">
                {field === "confirmPassword" ? "Confirm Password" : field}
              </label>
              <input
                type={
                  field.toLowerCase().includes("password") ? "password" : "text"
                }
                name={field}
                placeholder={`Enter your ${field}`}
                {...formik.getFieldProps(field)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  formik.touched[field] && formik.errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors[field]}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg transition-transform transform hover:scale-105"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

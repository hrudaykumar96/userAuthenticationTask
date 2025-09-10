import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { forgotpassword, verifyForgotPassword } from "../services/userServices";
import Loader from "../components/Loader";

export default function ResetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "MERN Task - Reset Password";
  }, []);

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await forgotpassword(values);
      if (response) {
        if (response.success) {
          setEmail(values.email);
          setStep("otp");
          setLoading(false);
          toast.success("OTP send successfully");
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

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await verifyForgotPassword({
        email,
        otp: values.otp,
        password: values.password,
      });
      if (response) {
        if (response.success) {
          setStep("email");
          emailFormik.resetForm();
          otpFormik.resetForm();
          setEmail("");
          navigate("/login");
          setLoading(false);
          toast.success("Password updated successfully");
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

  if(loading) return <Loader/>

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        {step === "email" ? (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Reset Password
            </h2>
            <form onSubmit={emailFormik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  {...emailFormik.getFieldProps("email")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    emailFormik.touched.email && emailFormik.errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {emailFormik.errors.email}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <FaKey />
                Send OTP
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Remembered your password?{" "}
              <NavLink
                to="/login"
                className="hover:text-indigo-600 font-medium"
              >
                Login
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Enter OTP & New Password
            </h2>
            <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Enter OTP sent to {email}
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  {...otpFormik.getFieldProps("otp")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    otpFormik.touched.otp && otpFormik.errors.otp
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {otpFormik.touched.otp && otpFormik.errors.otp && (
                  <div className="text-red-500 text-sm mt-1">
                    {otpFormik.errors.otp}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  {...otpFormik.getFieldProps("password")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    otpFormik.touched.password && otpFormik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {otpFormik.touched.password && otpFormik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {otpFormik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  {...otpFormik.getFieldProps("confirmPassword")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    otpFormik.touched.confirmPassword &&
                    otpFormik.errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {otpFormik.touched.confirmPassword &&
                  otpFormik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {otpFormik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <FaKey />
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

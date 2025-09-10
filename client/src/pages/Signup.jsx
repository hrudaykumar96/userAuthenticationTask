import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus, FaKey } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { userregister, verifyEmail } from "./../services/userServices";
import Loader from "../components/Loader";

export default function Signup() {
  const [step, setStep] = useState("signup");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MERN Task - Signup";
  }, []);

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await userregister(values);
      if (response) {
        if (response.success) {
          setEmail(values.email);
          setStep("otp");
          setLoading(false);
          toast.success("OTP send successfully");
        } else if (response?.error) {
          setLoading(false);
          toast.error(response?.error);
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
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await verifyEmail({ email, otp: values.otp });
      if (response) {
        if (response.success) {
          setStep("signup");
          signupFormik.resetForm();
          otpFormik.resetForm();
          setEmail("");
          setLoading(false);
          navigate('/login');
          toast.success("Email verified successfully");
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

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        {step === "signup" ? (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Sign Up
            </h2>
            <form onSubmit={signupFormik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  {...signupFormik.getFieldProps("name")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    signupFormik.touched.name && signupFormik.errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {signupFormik.touched.name && signupFormik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {signupFormik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  {...signupFormik.getFieldProps("email")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    signupFormik.touched.email && signupFormik.errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {signupFormik.touched.email && signupFormik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {signupFormik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  {...signupFormik.getFieldProps("password")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    signupFormik.touched.password &&
                    signupFormik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {signupFormik.touched.password &&
                  signupFormik.errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {signupFormik.errors.password}
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
                  placeholder="Confirm your password"
                  {...signupFormik.getFieldProps("confirmPassword")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                    signupFormik.touched.confirmPassword &&
                    signupFormik.errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {signupFormik.touched.confirmPassword &&
                  signupFormik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {signupFormik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <FaUserPlus />
                Sign Up
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
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
              Verify OTP
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

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <FaKey />
                Verify OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { loginUser, verifyLogin } from "../services/userServices";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function Login() {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validationSchema: Yup.object(
      step === 1
        ? {
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          }
        : {
            otp: Yup.string().required("OTP is required"),
          }
    ),
    onSubmit: async (values, { resetForm }) => {
      if (step === 1) {
        setLoading(true);
        const response = await loginUser(values);
        if (response) {
          if (response.success) {
            setUserEmail(values.email);
            setStep(2);
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
      } else {
        setLoading(true);
        const response = await verifyLogin({
          email: userEmail,
          otp: values.otp,
        });
        if (response) {
          if (response.success) {
            resetForm();
            setStep(1);
            navigate('/profile');
            setLoading(false);
            toast.success("Logged in successfully");
          } else if (response?.error) {
            setLoading(false);
            toast.error(response?.error);
          }
        } else {
          setLoading(false);
          toast.error("Please try again later");
        }
      }
    },
  });

  const getInputClasses = (field) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-indigo-500"
    }`;

  useEffect(() => {
    document.title = "MERN Task - Login";
  }, []);

  if(loading) return <Loader/>

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {step === 1 ? "Login" : "Enter OTP"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                  className={getInputClasses("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
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
                  {...formik.getFieldProps("password")}
                  className={getInputClasses("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                OTP sent to {userEmail}
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                {...formik.getFieldProps("otp")}
                className={getInputClasses("otp")}
              />
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.otp}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer"
          >
            <FaSignInAlt />
            {step === 1 ? "Login" : "Verify OTP"}
          </button>
        </form>

        {step === 1 && (
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <NavLink to="/reset" className="hover:text-indigo-600">
              Forgot Password?
            </NavLink>
            <NavLink to="/signup" className="hover:text-indigo-600">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

import axios from "axios";

export const userregister = async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      values,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data || { error: "Please try again later" };
  }
};

export const verifyEmail = async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/verifyEmail`,
      values,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data || { error: "Please try again later" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      data,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

export const verifyLogin = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/verifyLogin`,
      data,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

export const fetchUserData = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/auth`,

      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/logout`,{},

      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

export const updateUser = async (values) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/user/update`, values ,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

export const forgotpassword = async (values) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/forgotpassword`, values ,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};


export const verifyForgotPassword = async (values) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/verifyForgotPassword`, values ,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Please try again later" };
  }
};

// Importing necessary stuff
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

// Creating a context for user-related data
const UserContext = createContext();

// This component wraps the whole app to provide user data everywhere
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user data
  const [isAuth, setIsAuth] = useState(false); // To check if user is logged in
  const [btnLoading, setBtnLoading] = useState(false); // To show loading while button is clicked
  const [loading, setLoading] = useState(true); // To show general loading when app starts

  // Function to log in user using email and password
  async function LoginUser(email, password, navigate) {
    setBtnLoading(true); // Start loading

    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      // If login successful, show success message
      toast.success(data.message);

      // Save token in local storage for future requests
      localStorage.setItem("token", data.token);

      // Update context with user data
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);

      // Show error message
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }
  // register user function
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true); // Start loading
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      // If login successful, show success message
      toast.success(data.message);
      // Save token in local storage for future requests
      localStorage.setItem("activationtoken", data.activationtoken);
      setBtnLoading(false);
      navigate("/Verify");
    } catch (error) {
      setBtnLoading(false);
      // Show error message
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }
  async function verifyOtp(otp, navigate) {
    setBtnLoading(true); // Start loading
    const activationtoken = localStorage.getItem("activationtoken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationtoken,
      });
      // If login successful, show success message
      toast.success(data.message);
      navigate("/login"); // Redirect to homepage
      localStorage.clear(); // Clear local storage (token, etc.)
      setBtnLoading(false); // Stop loading
    } catch (error) {
      setBtnLoading(false);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }

  // Function to get user data if token exists in localStorage
  async function FetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // If token is valid, update the user and auth state
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); // Even if error, stop loading
    }
  }

  // When app first loads, try to fetch user data if token exists
  useEffect(() => {
    FetchUser();
  }, []);

  // Provide the values to all components
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        LoginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
      }}
    >
      {children}
      <Toaster /> {/* Used to show toast notifications */}
    </UserContext.Provider>
  );
};

// This makes it easy to use the context anywhere
export const UserData = () => useContext(UserContext);

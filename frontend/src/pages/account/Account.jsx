import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import "./account.css";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Profile component
const Account = ({user}) => {
    const {setIsAuth, setUser} = UserData(); // Getting functions from context
    const navigate = useNavigate(); // To redirect to another page

    // Function to log out user
    const logoutHandler = () => {
        localStorage.clear(); // Clear local storage (token, etc.)
        setUser([]); // Reset user data
        setIsAuth(false); // Mark user as logged out
        toast.success("Logout Successfully"); // Show toast
        navigate("/login"); // Redirect to login page
    }

  return (
    <div>
     {user && ( // Show this only if user is logged in
       <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name - {user.name}</strong>
          </p>
          <p>
            <strong>Email - {user.email}</strong>
          </p>

          {/* Dashboard button (you can add functionality later) */}
          <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="common-btn">
            <MdDashboard />
            Dashboard
          </button>

          <br />

          {/* Logout button */}
          <button onClick={logoutHandler} className="common-btn" style={{background :"red"}}>
            <IoMdLogOut />
            Logout
          </button>
        </div>
      </div>)}
    </div>
  );
};

export default Account;

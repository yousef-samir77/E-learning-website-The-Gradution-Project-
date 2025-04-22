import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
const Verfiy = () => {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form>
            <label htmlFor="otp">otp
            </label>
            <input type="number" required />
            <button className="common-btn">Verify</button>
        </form>
        <p>
            Go to <Link to='/login'>Login </Link> page
        </p>
      </div>
    </div>
  );
};

export default Verfiy;

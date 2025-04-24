import React, { useEffect } from "react";
import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const PaymentSuccess = () => {
  const { user, fetchUser } = UserData();
  const params = useParams();

  useEffect(() => {
    // Re-fetch user data so subscriptions are updated
    fetchUser();
  }, []);

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment successful</h2>
          <p>Your course subscription has been activated</p>
          <p>Reference no - {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;

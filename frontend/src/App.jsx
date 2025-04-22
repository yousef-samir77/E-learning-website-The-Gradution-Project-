import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verfiy from "./pages/auth/Verfiy";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";

function App() {
  const { isAuth, user } = UserData(); // Get user and auth state from context

  return (
    <>
      <BrowserRouter>
        <Header isAuth={isAuth} /> {/* Show header and pass auth state */}
        <Routes>
          {/* Home page is public */}
          <Route path="/" element={<Home />} />

          {/* About page is public */}
          <Route path="/about" element={<About />} />

          {/* If user is logged in, show Account. Otherwise, go to Login */}
          <Route
            path="/account"
            element={isAuth ? <Account user={user} /> : <Login />}
          />

          {/* Login route, show Home if already logged in */}
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />

          {/* Register route, show Home if already logged in */}
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />

          {/* Verify route, show Home if already logged in */}
          <Route path="/verify" element={isAuth ? <Home /> : <Verfiy />} />
        </Routes>
        <Footer /> {/* Footer is always shown */}
      </BrowserRouter>
    </>
  );
}

export default App;

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
// import { UserData } from "./context/UserContext";
function App() {
  const { isAuth,user } = UserData();
  // const { user } = UserData();
  // console.log(user);
  // const { user } = UserData();
  // console.log(user);
  // const { user } = UserData();
  //  const { user } = UserData();
  //  console.log(user);
  return (
    <>
      <BrowserRouter>
        <Header isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          <Route path="/verify" element={isAuth ? <Home /> : <Verfiy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseStudy from "./pages/courseStudy/CourseStudy";

function App() {
  const { isAuth, user, loading } = UserData(); // Get user and auth state from context

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} /> {/* Show header and pass auth state */}
          <Routes>
            {/* Home page is public */}
            <Route path="/" element={<Home />} />

            {/* About page is public */}
            <Route path="/about" element={<About />} />
            {/* Courses page is public */}
            <Route path="/courses" element={<Courses />} />

            {/* If user is logged in, show Account. Otherwise, go to Login */}
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            {/* Login route, show Home if already logged in */}
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />

            {/* Register route, show Home if already logged in */}
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />

            {/* Verify route, show Home if already logged in */}
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />

            {/*             <Route path="/course/study/:id" element={isAuth ? <CourseDescription /> : <Login />} />
             */}

            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/:dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
          </Routes>
          <Footer /> {/* Footer is always shown */}
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

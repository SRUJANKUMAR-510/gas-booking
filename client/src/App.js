import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterGas from './Pages/RegisterGas';
import Booking from "./Pages/Booking";
import BookForGas from "./Pages/BookForGas";
import OrderHistory from "./Pages/OrderHistory";
import ForgotPas from "./Pages/ForgotPas";
import Admin from "./Pages/Admin";
import Dealer from "./Pages/Dealer";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/RegisterGas" element={<RegisterGas />} />
            <Route path="/bookforgas" element={<BookForGas/>} />
            <Route path="/orderhistory" element={<OrderHistory/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/forgotpassword" element={<ForgotPas />} />
            <Route path="/dealer" element={<Dealer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

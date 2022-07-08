import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Homepage from "./pages/Homepage/index";
import Header from "./components/Header/index";
import Register from "./pages/Register/index";
import Login from "./pages/Login/index";
import Error from "./components/Error";
import Footer from "./components/Footer/index";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const Globalstyle = createGlobalStyle`
div{
  font-family:Lato,sans-serif;
}
body{margin:0;}

`;


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

      <Globalstyle />
      <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </Router>
  </React.StrictMode>
);

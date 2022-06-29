import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/index";
import Register from "./pages/Register/index"
import Login from "./pages/Login/index"
import Error from "./components/Error"
import Footer from "./components/Footer/index"
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




const Globalstyle = createGlobalStyle`
div{
  font-family:Lato,sans-serif;
}
body{margin:0;}

`


function App(){
const root = ReactDOM.createRoot(document.getElementById("root"));
return(
root.render(
  <React.StrictMode>
    <Globalstyle />
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element ={<Register />} />
        <Route path="/login" element ={<Login/>}/>
        <Route path ="/*" element={<Error/>}/>
      </Routes>
      <Footer/>
    </Router>
  </React.StrictMode>)
)
}


App()
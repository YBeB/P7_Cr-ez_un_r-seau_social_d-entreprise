import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header/index'
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

const Globalstyle = createGlobalStyle`
div{
  font-family:Lato,sans-serif;
}
body{margin:0;}

`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Globalstyle/>
    <Header/>
   <Routes>

    </Routes>
  </React.StrictMode>
);


import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';




// Change line 9 to this:
// Change line 9 to this:
import Signup from './pages/Signup';
import About from './landing_page/about/About';
import ProductPage from "./landing_page/products/ProductsPage";
import SupportPage from"./landing_page/support/SupportPage";

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import PricingPage from './landing_page/pricing/PricingPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/"element={<HomePage/>}/>
    <Route path="/signup"element={<Signup/>}/>
    
    <Route path="/about"element={<About/>}/>
    <Route path="/product"element={<ProductPage/>}/>

    <Route path="/pricing"element={<PricingPage/>}/>
    <Route path="/support"element={<SupportPage/>}/>
  </Routes>
  <Footer/>
  
  </BrowserRouter>
  
);


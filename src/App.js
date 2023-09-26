//import logo from './logo.svg';
//import Container from 'react-bootstrap/Container';
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Header from './views/Header';
import User from './views/User';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Registration from './views/Registration';
import EditReact from "./views/EditReact";
import CreateReact from "./views/CreateReact";
import ListReact from "./views/ListReact";
//import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
//import axios from 'axios';
//import React, { useState } from 'react';


function App() {
  

  return (
    
    <div className='App'>
    <BrowserRouter>
    <Header />
    
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route path="/product/edit/:id" element={<EditReact/>}></Route>
      <Route path="/product/create/" element={<CreateReact/>}></Route>
      <Route exact path="/" element={<ListReact/>}></Route>
      
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

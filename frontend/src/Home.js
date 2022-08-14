import logo from './logo.svg';
import {useEffect, useState} from 'react';
import { ReactDOM } from 'react';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Navbar from './components/Navbar.js';
import AddWorkout from './components/AddWorkout.js';
import './App.css';


function Home() {


  return (
    <div>
      <Navbar />
      <AddWorkout/>
    </div>
  );
}

export default Home;
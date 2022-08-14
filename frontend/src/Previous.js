import logo from './logo.svg';
import {useEffect, useState} from 'react';
import { ReactDOM } from 'react';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Navbar from './components/Navbar.js';
import PreviousWorkouts from './components/PreviousWorkouts';
import './App.css';


function Previous() {


  return (
    <div>
      <Navbar />
      <PreviousWorkouts/>
    </div>
  );
}

export default Previous;
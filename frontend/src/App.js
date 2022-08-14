import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Home.js';
import PreviousWorkouts from './PreviousWorkouts.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element= {<Home/>}/>
    <Route path='/PreviousWorkouts'  element= {<PreviousWorkouts/>}/>
  </Routes>
  </BrowserRouter>
)

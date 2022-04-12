// client/src/App.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Layout from './Components/Layout';
import ShowVehicle from './Components/Vehicles/ShowVehicle';
import AllVehicles from './Components/Vehicles/AllVehicles';
import AddVehicle from './Components/Vehicles/AddVehicle';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/vehicles' element={<AllVehicles />} />
          <Route path='/vehicles/new' element={<AddVehicle />} />
          <Route path='/vehicles/:id' element={<Layout />} >
            <Route index element={<ShowVehicle />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
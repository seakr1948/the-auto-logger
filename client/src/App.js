// client/src/App.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import "./App.css";

import React, { useState, useContext } from "react";
import AuthContext from './Context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import Layout from './Components/Layout';
import ShowVehicle from './Components/Vehicles/ShowVehicle';
import AllVehicles from './Components/Vehicles/AllVehicles';
import AddVehicle from './Components/Vehicles/NewVehicle';
import NewFuelLog from './Components/FuelLogs/NewFuelLog';
import PrivateWrapper from './Components/PrivateWrapper';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route element={<PrivateWrapper user={auth} />}>
            <Route path='/vehicles' element={<Layout />} >
              <Route index element={<AllVehicles />} />
              <Route path='new' element={<AddVehicle />} />
              <Route path=':id' element={<ShowVehicle />} />
              <Route path=':id/fuellogs/new' element={<NewFuelLog />} />

            </Route >
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
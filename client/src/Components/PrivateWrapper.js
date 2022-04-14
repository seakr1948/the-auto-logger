import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';


const PrivateWrapper = ({ user }) => {

    const { auth } = useContext(AuthContext);

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
};

export default PrivateWrapper
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';
import { handleForm } from '../Utils/Utils';
import axios from 'axios';


const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function getUser() {
        axios.get('/user',
            {
                withCredentials: true,
            })
            .then(res => {
                console.log(res.data);

            })
    }

    function login() {
        axios.post('/login', {
            username,
            password
        },
            {
                withCredentials: true
            })
            .then(res => {
                const result = res.data;
                if (result) {
                    sessionStorage.setItem("token", result.token);
                    setAuth(result.token);
                    navigate('/vehicles');
                } else {
                    console.error("Errr with password or username")
                }
            })

    }
    return (
        <div className='container'>
            <h1 className='my-2'>Login</h1>
            <form onSubmit={e => handleForm(e, login)}>
                <label className='form-label' htmlFor="username">Username</label>
                <input className='form-control' type="text" name="username" id="username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label className='form-label' htmlFor="password">Password</label>
                <input className='form-control' type="password" name="password" id="password" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='btn btn-success mt-3'>Add User</button>
            </form>
        </div>
    )
}

export default LoginForm
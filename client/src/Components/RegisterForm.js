import axiosApiInstance from '../interceptor/interceptor';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleForm } from '../Utils/Utils'

const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function addUser() {
        axiosApiInstance.post('/register',
            {
                username,
                email,
                password
            },
            {
                withCredentials: true
            })
            .then(navigate('/login'))
    }

    return (
        <div className='container'>
            <h1 className='mt-3'>Register</h1>
            <form onSubmit={e => handleForm(e, addUser)}>
                <label className='form-label' htmlFor="username">Username</label>
                <input className='form-control' type="text" name="username" id="username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label className='form-label' htmlFor="email">Email</label>
                <input className='form-control' type="email" name="email" id="email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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

export default RegisterForm
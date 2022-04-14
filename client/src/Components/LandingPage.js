import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='container'>
            <h1>Landing Page</h1>
            <Link className='link-success' to={`/vehicles`}>Go to vehicles</Link>
            <Link className='link-success' to={`/register`}>Register</Link>
            <Link className='link-success' to={`/login`}>Login</Link>

        </div>
    )
}

export default Home
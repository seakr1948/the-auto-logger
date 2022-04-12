import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link className='link-success' to={`/vehicles`}>Go to vehicles</Link>

        </div>
    )
}

export default Home
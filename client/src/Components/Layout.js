import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
const Layout = () => {
    return (
        <div className='flex-wrapper'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
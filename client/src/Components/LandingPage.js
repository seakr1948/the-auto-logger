import React from 'react'
import { useContext } from 'react'
import AuthContext from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
const Home = () => {

    const { auth, setAuth } = useContext(AuthContext);
    function logOut() {
        sessionStorage.setItem("token", '');
        setAuth('');
    }

    return (
        <div className='landing-body d-flex text-center text-white'>
            <video autoPlay muted loop id='video'>
                <source src={process.env.PUBLIC_URL + '/videos/background-video.mp4'}>
                </source>
            </video>
            <div id="overlay"></div>
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" type="video/webm">
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-left my-3">The Auto Logger</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-right my-3">
                            <Link className="nav-link text-white hover-outline active" aria-current="page" to="#">Home</Link>
                            {
                                (!auth) ?
                                    <div className="nav nav-masthead justify-content-center float-md-right">
                                        <Link className="nav-link text-white hover-outline" to="/login">Login</Link>
                                        <Link className="nav-link text-white hover-outline" to="/register">Register</Link>
                                    </div>

                                    : <button className="nav-link text-white hover-outline landing-button" onClick={() => logOut()}>Logout</button>
                            }




                        </nav>
                    </div>
                </header>
                <main className="px-3">
                    <h1>The Auto Logger</h1>
                    <p className="lead"> Welcome to The Auto Logger! <br /> Track the fuel efficiency of your vehicle in one convenient place. <br />
                        Sign up to get started today!</p>
                    {
                        (!auth) ?
                            <Link to="/login" className="btn btn-primary btn-lg font-weight-bold ">Log in</Link>
                            :
                            <Link to="/vehicles" className="btn btn-primary btn-lg font-weight-bold ">View
                                Vehicles</Link>
                    }

                </main>

                <footer className="mt-auto text-white-50">
                    <p>&copy; 2022 </p>
                </footer>


            </div>
        </div>

    )
}

export default Home
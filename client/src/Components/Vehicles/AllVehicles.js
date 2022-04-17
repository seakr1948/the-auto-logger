import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { headerConfig } from '../../Utils/Utils';
import AuthContext from '../../Context/AuthProvider';
const AllVehicles = () => {
    const { auth } = useContext(AuthContext);
    const [token, setToken] = useState(sessionStorage.getItem("token") || '');
    const header_config = headerConfig();
    const [vehicles, setVehicles] = useState([]);

    function deleteVehicle(vehicle_id) {
        axios.delete(`/vehicles/${vehicle_id}`,
            {
                withCredentials: true,
                headers: {
                    "authorization": token
                }
            })
            .then(setVehicles(prev =>
                prev.filter(vehicle => vehicle._id !== vehicle_id)
            ))
    }

    useEffect(() => {
        axios.get('/vehicles',
            {
                headers: {
                    "authorization": sessionStorage.getItem('token')
                },
                withCredentials: true,
            })
            .then(res => setVehicles(res.data))
    }, [])


    return (
        <div className='container'>
            <div className='mb-2 container-fluid d-flex flex-column align-items-center'>
                <h1 className='my-3 text-center'>All Vehicles</h1>
                <Link className='btn btn-primary ' to={`/vehicles/new`}>Add Vehicle</Link>
            </div>

            <div className='border-top'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Year</th>
                            <th scope="col">Make</th>
                            <th scope="col">Model</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !vehicles ?
                                ''
                                :
                                vehicles.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{element.year}</th>
                                            <td>{element.make}</td>
                                            <td>{element.model}</td>
                                            <td><Link className='btn btn-success' to={`/vehicles/${element._id}`}>Select</Link></td>
                                            <td><button className='btn btn-danger' onClick={() => deleteVehicle(element._id)}>Delete</button></td>
                                        </tr>
                                    )

                                })

                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllVehicles
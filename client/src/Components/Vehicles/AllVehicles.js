import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        axios.get('/vehicles')
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
                                            <td><Link className='btn btn-danger' to={`/vehicles/${element._id}/delete`}>Delete</Link></td>
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
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleForm } from '../../Utils/Utils';
import axios from 'axios';

const AddVehicle = () => {

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');

    async function addNewVehicle() {
        axios.post('/vehicles/new',
            {
                make,
                model,
                year
            },
            {
                withCredentials: true,
            })
    }

    return (
        <div className='container'>
            <div className='mb-4'>
                <h1>Add Vehicle</h1>
                <Link className='btn btn-info' to={`/vehicles`}>Back to Vehicles</Link>
            </div>

            <form onSubmit={e => handleForm(e, addNewVehicle)} validate>
                <label className='form-label' htmlFor="">Year</label>
                <input className='form-control' type="text" value={year} onChange={e => setYear(e.target.value)} />
                <label className='form-label' htmlFor="">Make</label>
                <input className='form-control' type="text" value={make} onChange={e => setMake(e.target.value)} />
                <label className='form-label' htmlFor="">Model</label>
                <input className='form-control' type="text" value={model} onChange={e => setModel(e.target.value)} />
                <button className='btn btn-success mt-3'>Add New Vehicle</button>
            </form>
        </div>
    )
}

export default AddVehicle
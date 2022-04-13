import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleForm } from '../../Utils/Utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVehicle = () => {

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

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
            .then(navigate('/vehicles'));
    }

    return (
        <div className='container'>
            <div className='mb-4'>
                <h1>Add Vehicle</h1>
                <Link className='btn btn-info' to={`/vehicles`}>Back to Vehicles</Link>
            </div>

            <form className='needs-validation' onSubmit={e => handleForm(e, addNewVehicle)} >
                <label className='form-label' htmlFor="">Year</label>
                <input required className='form-control valid' type="number" min={1988} max={2022} value={year} onChange={e => setYear(e.target.value)} />
                <label className='form-label' htmlFor="">Make</label>
                <input required className='form-control invalid' type="text" value={make} onChange={e => setMake(e.target.value)} />
                <label className='form-label' htmlFor="">Model</label>
                <input required className='form-control' type="text" value={model} onChange={e => setModel(e.target.value)} />
                <button className='btn btn-success mt-3'>Add New Vehicle</button>
            </form>
            <script src='../../Utils/Validation.js'></script>
        </div>
    )
}

export default AddVehicle
import React, { useEffect } from 'react'
import { useState } from 'react';
import { handleForm } from '../../Utils/Utils'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import axiosApiInstance from '../../interceptor/interceptor';

const NewFuelLog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const data = useLocation();
    const [pastMileage, setPastMileage] = useState('');
    const [currentMileage, setCurrentMileage] = useState('');
    const [costPerGallon, setCostPerGallon] = useState('');
    const [totalGallons, setTotalGallons] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        setPastMileage(data.state.current_mileage || 0);
    }, [])

    useEffect(() => {
        if (costPerGallon !== '' && totalGallons !== '') {
            setTotalPrice(parseFloat(costPerGallon * totalGallons).toFixed(2));
        } else {
            setTotalPrice('')
        }
    }, [costPerGallon, totalGallons]);

    function addFuelLog() {
        const total_miles = (currentMileage - pastMileage)
        const mpg = total_miles / totalGallons;

        axiosApiInstance.post(`/vehicles/${id}/fuellogs/new`,
            {
                current_mileage: parseInt(currentMileage),
                past_mileage: parseInt(pastMileage),
                cost_per_gallon: parseFloat(costPerGallon),
                total_gallons: parseFloat(totalGallons),
                total_price: parseFloat(totalPrice),
                total_miles: parseInt(total_miles),
                mpg: parseFloat(mpg)
            })
            .then(navigate(`/vehicles/${id}`))
    }

    return (
        <div className='container'>
            <h1>Add New Fuel Log</h1>
            <Link className='btn btn-success my-3' to={`/vehicles/${id}`}>Back To Vehicle</Link>
            <form onSubmit={e => handleForm(e, addFuelLog)} >
                <label className='form-label' htmlFor="past-mileage">Past Mileage</label>
                <input required className='form-control' type="number" min={0} name="past-mileage" id="past-mileage"
                    inputMode='number'
                    value={pastMileage}
                    onChange={e => setPastMileage(e.target.value)}
                />
                <label className='form-label' htmlFor="current-mileage">Current Mileage</label>
                <input required className='form-control' type="number" name="current-mileage" id="current-mileage" min={0}
                    inputMode='number'
                    value={currentMileage}
                    onChange={e => setCurrentMileage(e.target.value)}
                />
                <label className='form-label' htmlFor="cpg">Cost Per Gallon</label>
                <input required className='form-control' type="number" name="cpg" id="cpg"
                    inputMode='decimal'
                    value={costPerGallon}
                    onChange={e => setCostPerGallon(e.target.value)}
                />
                <label className='form-label' htmlFor="total-gallons">Total Gallons</label>
                <input required className='form-control' type="number" name="total-gallons" id="total-gallons"
                    inputMode='decimal'
                    value={totalGallons}
                    onChange={e => setTotalGallons(e.target.value)}
                />
                <label className='form-label' htmlFor="total-price">Total Price</label>
                <input required className='form-control' type="number" name="total-price" id="total-price"
                    inputMode='decimal'
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)}
                />

                <button className='mt-3 btn btn-success'>Submit</button>
            </form>
        </div>
    )
}

export default NewFuelLog
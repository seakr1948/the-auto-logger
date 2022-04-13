import React from 'react'
import { handleForm } from '../../Utils/Utils'

const NewFuelLog = () => {

    function addFuelLog() {

    }
    return (
        <div className='container'>
            <h1>Add New Fuel Log</h1>

            <form onSubmit={e => handleForm(e, addFuelLog)}>
                <label className='form-label' htmlFor="">Past Mileage</label>
                <input className='form-control' type="text" name="" id="" />
                <label className='form-label' htmlFor="">Current Mileage</label>
                <input className='form-control' type="text" name="" id="" />
                <label className='form-label' htmlFor="">Cost Per Gallon</label>
                <input className='form-control' type="text" name="" id="" />
                <label className='form-label' htmlFor="">Total Gallons</label>
                <input className='form-control' type="text" name="" id="" />
                <label className='form-label' htmlFor="">Total Price</label>
                <input className='form-control' type="text" name="" id="" />

                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    )
}

export default NewFuelLog
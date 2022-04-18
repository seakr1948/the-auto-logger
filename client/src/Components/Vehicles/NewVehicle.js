import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleForm } from '../../Utils/Utils';
import { useNavigate } from 'react-router-dom';
import axiosApiInstance from '../../interceptor/interceptor';



const NewVehicle = () => {

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('2020');
    const [modelList, setModelList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [yearsArray, setYearsArray] = useState([])
    const navigate = useNavigate();


    useEffect(() => {

        for (let i = 2020; i >= 1992; i--) {
            setYearsArray(prev => [...prev, i]);
        }
        axiosApiInstance.get('/carlist')
            .then(res => {

                setMakeList(res.data.make_list.sort());
                setMake(res.data.make_list[0])
            })
    }, []);

    useEffect(() => {
        axiosApiInstance.get('/getmake', {
            params: {
                year, make
            }
        })
            .then(res => setModelList(res.data))
    }, [make, year])

    async function addNewVehicle() {
        axiosApiInstance.post('/vehicles/new',
            {
                make,
                model,
                year
            })
            .then(res => console.log(res.data))
            .then(navigate('/vehicles'))
    }

    return (
        <div className='container'>
            <div className='mb-4'>
                <h1>Add Vehicle</h1>
                <Link className='btn btn-info' to={`/vehicles`}>Back to Vehicles</Link>
            </div>

            <form className='needs-validation' onSubmit={e => handleForm(e, addNewVehicle)} >
                <label className='form-label' htmlFor="year">Year</label>
                <select required className="form-control" id='year' value={year} onChange={e => setYear(e.target.value)}>
                    {
                        yearsArray.map((element, index) => {
                            return <option key={index} value={element}>{element}</option>
                        })
                    }
                </select>
                <label className='form-label' htmlFor="">Make</label>
                <select required className='form-control' value={make} onChange={e => setMake(e.target.value)}>
                    {
                        makeList.map((element, index) => {
                            return <option value={element} key={index}>{element}</option>
                        })
                    }
                </select>
                <label className='form-label' htmlFor="">Model</label>
                <select required className='form-control' value={model} onChange={e => setModel(e.target.value)}>
                    {
                        modelList.map((element, index) => {
                            return <option value={element.Model} key={index}>{element.Model}</option>
                        })
                    }
                </select>
                <button className='btn btn-success mt-3'>Add New Vehicle</button>
            </form>
            <script src='../../Utils/Validation.js'></script>
        </div>
    )
}

export default NewVehicle
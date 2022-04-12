import React from 'react'
import { useParams } from 'react-router-dom'

const ShowVehicle = () => {
    const { id } = useParams();
    return (
        <div>
            ShowVehicle
            <p>ID: {id}</p>
        </div>
    )
}

export default ShowVehicle
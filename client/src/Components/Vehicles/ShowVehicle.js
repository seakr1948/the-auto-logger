import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, defaults } from 'chart.js/auto';

const ShowVehicle = () => {
    const { id } = useParams();

    const [vehicle, setVehicle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fuelLogs, setFuelLogs] = useState({})

    const [recentMPG, setRecentMPG] = useState(0);
    const [overallMPG, setOverallMPG] = useState(0);
    const [bestMPG, setBestMPG] = useState(0);

    const [totalMiles, setTotalMiles] = useState(0);
    const [totalGallons, setTotalGallons] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const [mpgArray, setMPGArray] = useState([]);

    useEffect(() => {
        axios.get(`/vehicles/${id}`,
            {
                withCredentials: true
            }
        )
            .then((res) => {
                setVehicle(res.data);
                const fuel_logs = res.data.fuel_logs;
                setFuelLogs(fuel_logs);


                let best_mpg = 0;
                let overall_mpg = 0;

                let total_gallons = 0;
                let total_price = 0;
                let total_miles = 0;

                for (let i in fuel_logs) {

                    if (i < 5) {
                        setMPGArray(prev => [...prev, fuel_logs[i].mpg]);
                    }
                    total_gallons += fuel_logs[i].total_gallons;
                    total_miles += fuel_logs[i].total_miles;
                    total_price += fuel_logs[i].total_price;

                    if (fuel_logs[i].mpg > best_mpg) {
                        best_mpg = fuel_logs[i].mpg;
                    }
                    overall_mpg += fuel_logs[i].mpg;
                }

                overall_mpg = (overall_mpg / fuel_logs.length).toFixed(1);
                setRecentMPG(fuel_logs[0].mpg);
                setBestMPG(best_mpg);
                setOverallMPG(overall_mpg);

                setTotalGallons(total_gallons.toFixed(1))
                setTotalMiles(total_miles);
                setTotalPrice(total_price.toFixed(2));

                setIsLoading(false);
            })
    }, [])

    return (
        <div className='container'>
            {
                isLoading ?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div>
                        <h1 className='text-center'>
                            {vehicle.year} {vehicle.make} {vehicle.model}
                        </h1>
                        {/* MPG Bar graph */}
                        <div class="container">
                            <div className='container bg-dark p-3 my-3 rounded-3'>
                                <Bar
                                    datasetIdKey='id'
                                    data={{
                                        labels: ['', '', '', '', ''],
                                        datasets: [
                                            {
                                                id: 1,
                                                label: '',
                                                data: mpgArray,
                                                backgroundColor: ['#ff7e15']
                                            },

                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            yAxes: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: "#444"

                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: "white",
                                                    font: {
                                                        size: 14,
                                                    }
                                                },
                                            },
                                            xAxes: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: "#444"
                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: 'white',

                                                }
                                            }
                                        },
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Recent Fuel MPG',
                                                color: 'white',
                                                font: {
                                                    size: 20
                                                }
                                            },
                                            legend: {
                                                display: false,
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Vehicle basic stats */}
                            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Recent MPG <span className='d-block fw-normal'>{recentMPG}</span></p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Best MPG <span className='d-block fw-normal'>{bestMPG}</span></p>

                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Overall MPG <span className='d-block fw-normal'>{overallMPG}</span></p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Total Miles <span className='d-block fw-normal'>{totalMiles}</span></p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Total Gallons <span className='d-block fw-normal'>{totalGallons}</span></p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        <p className='text-center fw-bold'>Total Price <span className='d-block fw-normal'>${totalPrice}</span></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='my-3'>
                            <h2>Fuel Logs</h2>
                            <Link className='btn btn-success' to={`/vehicles/${id}/fuellogs/new`}>Add Fuel Log</Link>

                            {
                                fuelLogs.map((element, index) => {
                                    return (
                                        <div className='row m-3 border border-2 border-dark rounded-3 fs-5'>
                                            <div className="col border-end"> <p className='fw-bold'>MPG <span className='d-block fw-normal'>{element.mpg}</span></p>  </div>
                                            <div className="col border-end"> <p className='fw-bold'>Total Miles <span className='d-block fw-normal'>{element.total_miles}</span></p> </div>
                                            <div className="col border-end"> <p className='fw-bold'>Total Gallons <span className='d-block fw-normal'>{element.total_gallons.toFixed(2)}</span></p></div>
                                            <div className="col "> <p className='fw-bold'>Total Price <span className='d-block fw-normal'>${element.total_price}</span></p></div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

            }
        </div>
    )
}

export default ShowVehicle
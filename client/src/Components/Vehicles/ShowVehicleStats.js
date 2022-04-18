import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosApiInstance from '../../interceptor/interceptor';
import { headerConfig } from '../../Utils/Utils';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, defaults } from 'chart.js/auto';

const ShowVehicleStats = () => {
    const header_config = headerConfig();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [dataLabels, setDataLabels] = useState([]);
    const [fuellogs, setFuelLogs] = useState([]);
    const [mpgArray, setMPGArray] = useState([]);
    const [costArray, setCostArray] = useState([]);
    const [gallonsArray, setGallonsArray] = useState([])

    function setData(data, data_label) {
        return (
            {
                labels: dataLabels,
                datasets: [
                    {
                        id: 1,
                        label: data_label,
                        data: data,
                        backgroundColor: ['#ff7e15'],
                        borderColor: '#ff7e15',
                        borderWidth: 5,
                        tension: 0.1
                    },

                ],
            }
        )
    }

    function setChartOption(title) {
        return (
            {
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
                        text: title,
                        color: 'white',
                        font: {
                            size: 20
                        }
                    },
                    legend: {
                        display: false,
                    }
                }
            }
        )
    }

    useEffect(() => {
        axiosApiInstance.get(`/vehicles/${id}`,
            {
                headers: header_config,
                withCredentials: true
            })
            .then(res => {
                const fuel_logs = res.data.fuel_logs
                setFuelLogs(fuel_logs)
                const data_labels = Array(fuel_logs.length).fill('')
                for (let i in fuel_logs) {
                    setMPGArray(prev => [...prev, fuel_logs[i].mpg]);
                    setCostArray(prev => [...prev, fuel_logs[i].total_price]);
                    setGallonsArray(prev => [...prev, fuel_logs[i].total_gallons])
                }
                setDataLabels(data_labels);
                setIsLoading(false)
            })

    }, []);
    return (
        <div className='container'>
            <h1>Vehicle Stats</h1>
            {
                isLoading ?
                    <div>
                        loading
                    </div>
                    :
                    <div className='grid'>

                        <div className='chart-container bg-dark rounded p-3'>
                            <Line
                                data={setData(mpgArray, 'mpg')}
                                options={setChartOption("Recent MPG")}
                            />
                        </div>
                        <div className='chart-container bg-dark rounded-3 p-3'>
                            <Line
                                data={setData(costArray, 'Cost')}
                                options={setChartOption("Cost Per Fuelup")}
                            />
                        </div>
                        <div className='chart-container bg-dark rounded-3 p-3'>
                            <Line
                                data={setData(gallonsArray, 'Gallons')}
                                options={setChartOption("Gallons Per Fuelup")}
                            />
                        </div>

                    </div>
            }
        </div>
    )
}

export default ShowVehicleStats
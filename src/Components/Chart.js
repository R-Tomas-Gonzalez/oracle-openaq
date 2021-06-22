import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';



const Chart = (props) => {

    const {lessThanArray, greaterThanArray} = props;
    
    const lessThanArrayLength = lessThanArray.length;
    const greaterThanArrayLength = greaterThanArray.length;

    const [objects, setObjects] = useState({});

    useEffect(() => {
        setObjects(
            {
                chartData: {
                    labels: ['Less Than 5', 'Greater than 5'],
                    datasets: [
                        {
                            label: 'No. of communities',
                            data: [
                                lessThanArrayLength,
                                greaterThanArrayLength
                            ],
                            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                            borderColor: [
                                'rgb(54, 162, 235)',
                                'rgb(255, 99, 132)'
                              ],
                        }
                    ]
                }
            })
    }, [lessThanArrayLength, greaterThanArrayLength])

    return (
        <div>
            <Container >
                <Bar className="barChart"
                    data={objects.chartData}
                    options={{
                        indexAxis: 'y',
                        elements: {
                            bar: {
                                borderWidth: 2,
                            },
                        },
                        responsive: true,
                    }}
                />

            </Container>
        </div>
    )
}

export default Chart

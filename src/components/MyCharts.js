import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

function randomColor() {
    return `rgb(${Math.random()*1000%255},${Math.random()*1000%255},${Math.random()*1000%255})`
}

function MyChart({type, title, endpoint, attribute, p_label}) {

    const canvasRef = useRef()

    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    async function loadChart({lbls, dt}) {      
        new Chart(
        canvasRef.current,
        {
            type: type,
            options: {
                responsive: true,
                animations: {
                    tension: {
                    duration: 2000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            },
            data: {
            labels: lbls,
            datasets: [{
                label: p_label,
                data: dt,
                borderColor: 'transparent',
                backgroundColor: lbls.map(() => randomColor() )
            }]
        }
        }
        );
    }
    
    loadChart({lbls: data.labels, dt: data.datasets})

    useEffect(() => {
        fetch(`http://localhost:9292/${endpoint}`, {
            headers: {
                "Authorization": "Bearer " +localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(res1 => {
            fetch("http://localhost:9292/categories", {
                headers: {
                    "Authorization": "Bearer " +localStorage.getItem('token')
                }
            })
            .then(res2 => res2.json())
            .then(res2 => {
                setData({
                    labels: res2.map(cat => cat.name),
                    datasets: res2.map(cat => {
                        return res1.reduce((acc, curr) => {
                            if (curr.category_id === cat.id) {
                                return acc + curr[attribute]
                            } else {
                                return acc + 0
                            }
                        },0)
                    })
                })
            })
        })
    }, [])

    return (
        <div className="canvas-wrapper" >
            <h2>{title ? title : null}</h2>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}


export { MyChart } ;
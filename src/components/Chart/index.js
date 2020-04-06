import React, { useEffect, useState } from 'react'
import { fetchDailyData } from '../../api'
import { Bar, Line } from 'react-chartjs-2'

import style from './Chart.module.css'

export default function Chart({
  data: { confirmed, recovered, deaths },
  selectedCountry,
}) {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }

    fetchAPI()
  }, [])

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#ff000099',
            backgroundColor: 'rgba(255,0,0,0.2)',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(0, 136, 0, 0.8)',
            backgroundColor: 'rgba(0,255,0,0.2)',
            fill: true,
          },
        ],
      }}
    />
  ) : null
  console.log(confirmed, recovered, deaths)

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(255, 0, 0, 0.5)',
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${selectedCountry}` },
      }}
    />
  ) : null

  return (
    <div className={style.container}>
      {selectedCountry ? barChart : lineChart}
    </div>
  )
}

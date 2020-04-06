import React, { useEffect, useState } from 'react'
import { fetchData } from './api'

import styles from './App.module.css'

import Card from './components/Cards'
import Chart from './components/Chart'
import CountryPicker from './components/CountryPicker'

function App() {
  const [data, setData] = useState({})
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    async function getData() {
      const value = await fetchData()
      setData(value)
    }
    getData()
  }, [])

  async function handleCountryChange(country) {
    const fetchedData = await fetchData(country)
    setData(fetchedData)
    setSelectedCountry(country)
  }

  return (
    <div className={styles.container}>
      <h1>Covid-19</h1>
      <h3>Corona Virus status</h3>
      <Card data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} selectedCountry={selectedCountry} />
    </div>
  )
}

export default App

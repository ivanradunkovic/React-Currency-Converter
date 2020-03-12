import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest' // this will get current exchange rates

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

useEffect(() => {
  fetch(BASE_URL) //logic for fetching data from the api
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    })
}, []) //empty array. call effect will call only first time when I run the app

  return (
    <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    />
    <div className="equals">=</div>
    <CurrencyRow
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    />
    </>
  )
}

export default App;
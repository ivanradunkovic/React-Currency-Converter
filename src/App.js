import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest' // this will get current exchange rates

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  // console.log(currencyOptions)  //uncoment this console log to see currency in browser when inspecting
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

useEffect(() => {
  fetch(BASE_URL) //logic for fetching data from the api
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[14] // 14 if number of HRK. Kuna on this list
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
    })
}, []) //empty array. call effect will call only first time when I run the app

  return (
    <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    selectedCurrency={fromCurrency}
    />
    <div className="equals">=</div>
    <CurrencyRow
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    selectedCurrency={toCurrency}
    />
    </>
  )
}

export default App;
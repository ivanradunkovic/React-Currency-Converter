import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest' // this will get current exchange rates

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  // console.log(currencyOptions)  //uncoment this console log to see currency in browser when inspecting
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1) //default amount for currency exchange
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount /exchangeRate
  }

useEffect(() => {
  fetch(BASE_URL) //logic for fetching data from the api
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[14] // 14 if number of HRK. Kuna on this list
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
}, []) //empty array. call effect will call only first time when I run the app

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]) //if this arry changes our exchange will still work

  function handleFromAmountChange(e) {
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
  }

  return (
    <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    selectedCurrency={fromCurrency}
    onChangeCurrency={e => setFromCurrency(e.target.value)}
    onChangeAmount={handleFromAmountChange}
    amount= {fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow
    currencyOptions={currencyOptions} //added currency otionos for drop down menu
    selectedCurrency={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
    onChangeAmount={handleToAmountChange}
    amount= {toAmount}
    />
    </>
  )
}

export default App;
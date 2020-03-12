import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions, //destructor
        selectedCurrency,
        onChangeCurrency
    } = props
    return (
        <div>
            <input type="number" className="input" /> 
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

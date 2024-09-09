import React, { useState, useEffect } from 'react'
import { CgArrowsExchangeV } from "react-icons/cg";
import axios from 'axios'

let baseUrl = 'https://api.freecurrencyapi.com/v1/latest';
let apikey = 'fca_live_nQ8Nw4VbBG8HXVXegYVnyKwcaLBpYoB4twPtikrX'

const currencyImages = {
    USD: "../src/assets/images/usa.webp",
    EUR: "../src/assets/images/eu.png",
    TRY: "../src/assets/images/tr.webp"
};
function Currency() {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [fromCurrencyImage, setFromCurrencyImage] = useState(currencyImages['USD']);
    const [toCurrencyImage, setToCurrencyImage] = useState(currencyImages['TRY']);

    useEffect(() => {
        const changeCurrency = async () => {
            if (amount) {
                try {
                    const response = await axios.get(`${baseUrl}?apikey=${apikey}&base_currency=${fromCurrency}`);
                    const rate = response.data.data[toCurrency];
                    setConvertedAmount((amount * rate).toFixed(2));
                }catch (error) {
                    console.error('Error fetching currency data:', error);
                }
            }
        };

        changeCurrency();
    }, [amount, fromCurrency, toCurrency])


    const handleCurrencyChange = (type, setter, imageSetter) => (e) => {
        const newValue = e.target.value;
        setter(newValue);
        imageSetter(currencyImages[newValue]);
    };

    return (
        <div className="currency-container">
            <h2>Currency Converter</h2>
            <div className="currency-box">
                <div className="change-currency">
                    <p>Amount</p>
                    <div className="box">
                        <div className="currency">
                            <img src={fromCurrencyImage} alt={fromCurrency} />
                            <select value={fromCurrency} onChange={handleCurrencyChange('from', setFromCurrency, setFromCurrencyImage)}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="TRY">TRY</option>
                            </select>
                        </div>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='enter amount...' />
                    </div>
                </div>
                <hr />
                <CgArrowsExchangeV className='icon' />
                <div className="change-currency">
                    <p>Converted amount</p>
                    <div className="box">
                        <div className="currency">
                            <img src={toCurrencyImage} alt={toCurrency} />
                            <select value={toCurrency} onChange={handleCurrencyChange('to', setToCurrency, setToCurrencyImage)}>
                                <option value="TRY">TRY</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                        <input type="number" value={convertedAmount} readOnly placeholder='converted amount' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Currency;

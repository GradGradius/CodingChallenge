import React, {useState} from 'react'
import {exportedUserName} from './Login'
import axios from 'axios'
import styles from './tablebox.module.css'


const AveragePrices = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());

    const creds = {
      "date_from": startDate,
      "date_to": endDate,
      "user_id": exportedUserName
    }

    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/average", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    const handleEndDateChange = e => {
        setEndDate(e.target.value);
    }
    const handleStartDateChange = e => {
        setStartDate(e.target.value)
    }

    return (
      <div className={styles.tablebox}><br />
    <label htmlFor="start">Start date:</label>
    <input onChange={handleStartDateChange} type="date" id="start" 
       value={startDate}
       min="2010-01-01" max="2022-08-25"/>

    <label htmlFor="start">End date:</label>
    <input onChange={handleEndDateChange} type="date" id="end" 
       value={endDate}
       min="2010-01-01" max="2022-08-25"/>
    <button className="pure-button" onClick={handleClick}>See Average Prices</button>
    <br />
    <table className="pure-table">
    <thead>
    <tr>
      <th>Instrument</th>
      <th>Type of deal</th>
      <th>Average Price</th>
    </tr>
    </thead>
    <tbody>
    {data.map(el => {
      return(
        <tr>
          <th>{el.deal_instrument_id}</th>
          <th>{el.deal_type}</th>
          <th>{el.average}</th>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>

    )
    
}

export default AveragePrices;
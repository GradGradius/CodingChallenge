import React, {useState} from 'react'
import mockedData from './mockAverage'
import {exportedUserName} from './Login'


const AveragePrices = () => {
    const [data, setData] = useState(mockedData.data);
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());

    //delete later
    console.log(mockedData.data)
    const creds = {
      "date_from": startDate,
      "date_to": endDate,
      "user_id": exportedUserName
    }

    const handleClick = () => {
        fetch(`localhost:5000/average`, {
          method: "GET",
          body: JSON.stringify(creds),
          headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => console.log(response.json()))
  }

    const handleEndDateChange = e => {
        setEndDate(e.target.value);
    }
    const handleStartDateChange = e => {
        setStartDate(e.target.value)
    }

    return (
    <>
    <label htmlFor="start">Start date:</label>
    <input onChange={handleStartDateChange} type="date" id="start" 
       value="2020-08-22"
       min="2018-01-01" max="2020-08-24"/>

    <label htmlFor="start">End date:</label>
    <input onChange={handleEndDateChange} type="date" id="end" 
       value="2020-08-22"
       min="2018-01-01" max="2020-08-24"/>
    <button onClick={handleClick}>See Average Prices</button>

    <table>
    <tbody>
    <tr>
      <th>Instrument</th>
      <th>Average Sell Price</th>
      <th>Average Buy Price</th>
    </tr>
    {data.forEach(el => {
      return(
        <tr>
          <th>{el.instrument}</th>
          <th>{el.averageSell}</th>
          <th>{el.averageBuy}</th>
        </tr>
      )
    })}
    </tbody>
    </table>
    </>

    )
    
}

export default AveragePrices;
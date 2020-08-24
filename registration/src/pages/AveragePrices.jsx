import React, {useState} from 'react'
import mockedData from './mockAverage'
import {exportedUserName} from './Login'
import axios from 'axios'


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

    async function handleClick() {
        // fetch(`localhost:5000/average`, {
        //   method: "GET",
        //   body: JSON.stringify(creds),
        //   headers: {
        //     "Content-Type": "application/json"
        // }
        const response =
        await axios.get("http://localhost:5000/average", { params : creds }
        );
        console.log(response.data);
        setData(response.data);

    //})
    //.then(response => console.log(response.json()))
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
       min="2010-01-01" max="2022-08-25"/>

    <label htmlFor="start">End date:</label>
    <input onChange={handleEndDateChange} type="date" id="end" 
       value="2020-08-22"
       min="2010-01-01" max="2022-08-25"/>
    <button onClick={handleClick}>See Average Prices</button>

    <table>
    <tbody>
    <tr>
      <th>Instrument ID</th>
      <th>Type of deal</th>
      <th>Average Price</th>
    </tr>
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
    </>

    )
    
}

export default AveragePrices;
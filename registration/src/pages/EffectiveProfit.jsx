import React, {useState} from 'react';
import {exportedUserName} from "./Login"

const EndingPositions = () => {
    const [data, setData] = useState('');
    const creds = {
        "user_id": exportedUserName
    }
    
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/effective-loss", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    return (
        <>
        <button onClick={handleClick}>See Effective Profit</button>
        <table>
        <tbody>
        <tr>
            <th>Dealer Name</th>
            <th>Effective Profit/Loss</th>
            <th>Instrument</th>
        </tr>
        {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_id}</th>
                <th>{el.effective_pnl}</th>
                <th>{el.dealer_instrument_id}</th>
            </tr>
            )
        })}
        </tbody>
        </table>
        </>


        </>
    )
}
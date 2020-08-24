import React, {useState} from 'react';
import {exportedUserName} from "./Login"

const EndingPositions = () => {
    const [data, setData] = useState('');
    const creds = {
        "user_id": exportedUserName
    }
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/realised-profit", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    return (
        <>
        <table>
        <tbody>
        <tr>
            <th>Dealer</th>
            <th>Realised Profit/Loss</th>
        </tr>
        {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_id}</th>
                <th>{el.realised_pnl}</th>
            </tr>
            )
        })}
        </tbody>
        </table>
        </>
    )
}
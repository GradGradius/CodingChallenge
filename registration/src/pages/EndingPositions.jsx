import React, {useState} from 'react';
import {exportedUserName} from "./Login"

const EndingPositions = () => {
    const [data, setData] = useState('');
    const creds = {
        "user_id": exportedUserName
    }
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/ending-positions", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    return (
        <>
        <button onClick={handleClick}>See Ending Positions</button>
        <table>
        <tbody>
        <tr>
            <th>Dealer Name</th>
            <th>Positions</th>
            <th>Instrument</th>
        </tr>
        {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_id}</th>
                <th>{el.postions}</th>
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
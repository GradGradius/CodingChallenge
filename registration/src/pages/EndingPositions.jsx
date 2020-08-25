import React, {useState} from 'react';
import {exportedUserName} from "./Login";
import axios from 'axios';
import styles from './tablebox.module.css'

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
        <div className={styles.tablebox}>
        <button className="pure-button"onClick={handleClick}>See Ending Positions</button>
        <table className="pure-table">
        <thead>
        <tr>
            <th>Dealer Name</th>
            <th>Positions</th>
            <th>Instrument</th>
        </tr>
        </thead>
        <tbody>
        {/* {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_id}</th>
                <th>{el.postions}</th>
                <th>{el.dealer_instrument_id}</th>
            </tr>
            )
        })} */}
        </tbody>
        </table>
        </div>

    )
}

export default EndingPositions;

import React, {useState} from 'react';
import {exportedUserName} from "./Login"
import axios from 'axios'
import styles from './tablebox.module.css'

const RealisedProfit = () => {
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
        <div className={styles.tablebox}>
        <button className="pure-button" onClick={handleClick}>See Realised Profit</button>
        <table className="pure-table">
        <thead>
        <tr>
            <th>Dealer</th>
            <th>Realised Profit/Loss</th>
        </tr>
        </thead>
        <tbody>
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
        </div>
    )
}

export default RealisedProfit;
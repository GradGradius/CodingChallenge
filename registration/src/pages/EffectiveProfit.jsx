import React, {useState} from 'react';
import {exportedUserName} from "./Login";
import axios from 'axios';
import styles from './tablebox.module.css'

const EffectiveProfit = () => {
    const [data, setData] = useState([]);
    const creds = {
        "user_id": exportedUserName
    }
    
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/effective_pnl", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    return (
        <div className={styles.tablebox}>
        <button className="pure-button" onClick={handleClick}>See Effective Profit</button>
        <table className="pure-table">
        <thead>
        <tr>
            <th>Dealer Name</th>
            <th>Effective Profit/Loss</th>
            <th>Instrument</th>
        </tr>
        </thead>
        <tbody>
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
        </div>

    )
}

export default EffectiveProfit;

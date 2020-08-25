import React, {useState} from 'react';
import {exportedUserName} from "./Login";
import axios from 'axios';
import styles from './tablebox.module.css'

const EffectiveProfit = () => {
    const [data, setData] = useState([]);
    const [dealer, setDealer] = useState(701)
    const creds = {
        "user_id": exportedUserName,
        "delaer_id": dealer
    }
    
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/effective-loss", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }

    return (
        <div className={styles.tablebox}>
        <button className="pure-button" onClick={handleClick}>See Effective Profit</button>
        <label htmlFor="cars">Choose a car:</label>

        <select name="cars" id="cars">
        <option value="701">701</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
        </select>
        <table className="pure-table">
        <thead>
        <tr>
            <th>Dealer Name</th>
            <th>Effective Profit/Loss</th>
            <th>Instrument</th>
        </tr>
        </thead>
        <tbody>
        { {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_id}</th>
                <th>{el.effective_pnl}</th>
                <th>{el.dealer_instrument_id}</th>
            </tr>
            )
        })} }
        </tbody>
        </table>
        </div>

    )
}

export default EffectiveProfit;

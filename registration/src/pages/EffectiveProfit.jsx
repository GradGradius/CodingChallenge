import React, {useState} from 'react';
import {exportedUserName} from "./Login";
import axios from 'axios';
import styles from './tablebox.module.css'

const EffectiveProfit = () => {
    const [data, setData] = useState([]);
    const [dealer, setDealer] = useState(701)
    const creds = {
        "user_id": exportedUserName,
        "dealer_id": dealer
    }
    const handleChange =(e) =>{
        setDealer(e.target.value);
    }
    
    async function handleClick() {
        const response =
        await axios.get("http://localhost:5000/effective_pnl", { params : creds }
        );
        console.log(response.data);
        setData(response.data);
  }
  const sum = data.reduce((acc,el) => acc+Number(el.effective_pnl),0)
    return (
        <div className={styles.tablebox}><br />
        <button className="pure-button" onClick={handleClick}>See Effective Profit</button>
        <label htmlFor="cars">Choose your Fighter:</label>

        <select onChange={handleChange} name="cars" id="cars">
        <option value="701">Lewis</option>
        <option value="702">Selvyn</option>
        <option value="703">Richard</option>
        <option value="704">Lina</option>
        <option value="705">John</option>
        <option value="706">Nidia</option>
        </select>
        <br />
        <table className="pure-table">
        <thead>
        <tr>
            <th>Instrument</th>
            <th>Effective Profit/Loss</th>
        </tr>
        </thead>
        <tbody>
        {data.map(el => {
            return(
            <tr>
                <th>{el.dealer_instrument_id}</th>
                <th>{el.effective_pnl}</th>
            </tr>
            )
        })} 
        </tbody>
        </table>
        <div>Total:{sum.toFixed(2)}</div>
        </div>

    )
}

export default EffectiveProfit;

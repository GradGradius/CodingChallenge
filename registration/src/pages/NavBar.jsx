import React from 'react'
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'

export const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <Link to='/average' replace className="pure-button">Average Prices</Link>
            <Link to='/effectiveprofit' replace className="pure-button">Effective Profit/Loss</Link>
            <Link to='/positions' replace className="pure-button">Ending Positions</Link>
            <Link to='/realisedprofit' replace className="pure-button">Realised Profit/Loss</Link>
        </div>
    )
}




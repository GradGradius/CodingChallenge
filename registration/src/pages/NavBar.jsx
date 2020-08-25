import React from 'react'
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'

export const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <Link to='/average' replace className={styles.button}>Average Prices</Link>
            <Link to='/effectiveprofit' replace className={styles.button}>Effective Profit/Loss</Link>
            <Link to='/positions' replace className={styles.button}>Ending Positions</Link>
            <Link to='/realisedprofit' replace className={styles.button}>Realised Profit/Loss</Link>
        </div>
    )
}




import React,  { Component,useState } from 'react';
import Cookies from 'js-cookie';
import AuthApi from '../contexts/AuthApi';


const Dataflow = () =>{

  const [data, setData] = useState([]);

  const handleClick = () => {
      fetch()
      .then(response => response.json())
      .then(data => setData(data))
  }
  return(
    <>
    <button onClick={handleClick}>See Average Prices</button>
    <table>
    <tr>
      <th>Instrument</th>
      <th>Average Price</th>
    </tr>
    {data.length && data.forEach(el => {
      return(
        <tr>
          <th>{el.instrument}</th>
          <th>{el.averagePrice}</th>
        </tr>
      )
    })}
    </table>
    </>
  )

}

// class Dataflow extends Component {
//     static contextType = AuthApi;


//     render() {
//         return (
//             <div>
//             <ul>
//                 {["Alex", "John", "Jaz", "fedrik", "missali"].map((user, idx) => {
//                   return <li key={idx}>{user}</li>;
//                 })}
//               </ul>
//               <button label="Click!" onClick={(event)=>{
//                   this.context.setAuth(false)
//                   Cookies.remove("user")
//                 }}/>
//             </div>
//           );                
//     }
// };

export default Dataflow;
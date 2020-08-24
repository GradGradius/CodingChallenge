import React,  { Component } from 'react';
import Cookies from 'js-cookie';
import AuthApi from '../contexts/AuthApi';

class Dataflow extends Component {
    static contextType = AuthApi;


    render() {
        return (
            <div>
            <ul>
                {["Alex", "John", "Jaz", "fedrik", "missali"].map((user, idx) => {
                  return <li key={idx}>{user}</li>;
                })}
              </ul>
              <button label="Click!" onClick={(event)=>{
                  this.context.setAuth(false)
                  Cookies.remove("user")
                }}/>
            </div>
          );                
    }
};

export default Dataflow;
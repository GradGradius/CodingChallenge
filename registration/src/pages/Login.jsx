import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthApi from '../contexts/AuthApi'
import styles from './Login.module.css'


export let exportedUserName = '';
class Login extends Component {
    static contextType = AuthApi;

    constructor(props){
      super(props);
      this.state={
        username:"",
        password:""
      }
      this.fun = this.fun.bind(this);
    }
   fun = (response) => {
    if (response.data ) {
        this.context.setAuth(true);
        exportedUserName = this.state.username;
    }
//    if (response.data  && response.data.code === 200) {
//        this.context.setAuth(true);
//        console.log("true")
//    }
   }

 handleClick(event){
    Cookies.set("user","loginTrue");
     var apiBaseUrl = "http://localhost:5000/";
     var self = this;
     var payload={
         "username":this.state.username,
         "password":this.state.password
     }
     axios.post(apiBaseUrl+'login', payload)
     .then(this.fun);
}

render() {
    return (
      <div className={styles.loginFrame}>
        <MuiThemeProvider>

          <div className={styles.loginFrame}>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => {
                this.setState(state => ({username:newValue}));
                exportedUserName = this.state.userName;
              }}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <button className="pure-button" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}> Submit </button>
         </div>


         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;
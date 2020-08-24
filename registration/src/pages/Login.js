import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthApi from '../contexts/AuthApi';

class Login extends Component {
    static contextType = AuthApi;

    constructor(props){
      super(props);
      this.state={
        username:"",
        password:""
      }
    }


 handleClick(event){
    this.context.setAuth(true);
    Cookies.set("user","loginTrue");
    // var apiBaseUrl = "http://localhost:5000/";
    // var self = this;
    // var payload={
    //     "username":this.state.username,
    //     "password":this.state.password
    // }
    // axios.post(apiBaseUrl+'login', payload)
    // .then(function (response) {
    //     if(response.data.code == 200){
    //     }
    // })
}

render() {
    return (
      <div>
        <MuiThemeProvider>

          <div>
            <AppBar title="Login"/>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>


         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  display: 'flex',  
  // justifyContent:'center', 
  // alignItems:'center',
  margin: 15,
};
export default Login;
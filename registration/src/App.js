import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import AuthApi from './contexts/AuthApi';
import Login from './pages/Login';
import Dataflow from './pages/Dataflow';
import CheckBox from './pages/AveragePrices'
import AveragePrices from './pages/AveragePrices';


function App() {
    const [auth,setAuth] = React.useState(false);

    return (

       <AuthApi.Provider value={{auth,setAuth}}>
         <Router>
           <Routes/>
         </Router>
       </AuthApi.Provider>
    );
  
}

class Routes extends Component{  
  static contextType = AuthApi;
  render() {
    return (
      <Switch>
          <ProtectedLogin path="/login" component={Login} auth={this.context.auth}/>
          <ProtectedRoute path="/average" component={AveragePrices} auth={this.context.auth}/>
          <Redirect path="/" to="/average"/>
      </Switch>
    )
  }
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  return(
    <Route 
      {... rest}
      render ={()=>auth ? (
        <Component/>
      ): (
        <Redirect to="/login"/>
      )}
    />)
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
  return(
    <Route 
      {... rest}
      render ={()=>!auth ? (
        <Component/>
      ): (
        <Redirect to="/average"/>
      )}
    />
  )
}

export default App;






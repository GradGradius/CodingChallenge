import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import AuthApi from './contexts/AuthApi';
import Login from './pages/Login';
import Dataflow from './pages/Dataflow';


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
          <ProtectedRoute path="/dataflow" component={Dataflow} auth={this.context.auth}/>
          <Redirect path="/" to="/dataflow"/>
      </Switch>
    )
  }
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  return(
    <Route 
      {... rest}
      render ={()=>auth?(
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
      render ={()=>!auth?(
        <Component/>
      ): (
        <Redirect to="/dataflow"/>
      )}
    />
  )
}

export default App;






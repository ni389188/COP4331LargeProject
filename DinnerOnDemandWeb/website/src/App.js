import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/RecipePage';

function App() {  
  return (    
  <Router >      
    <Switch>        
      <Route path="/" exact>          
      <LoginPage />        
      </Route>        
      <Route path="/COP4331LargeProject" exact>          
      <CardPage />        
      </Route>        
      <Redirect to="/" />      
      </Switch>      
      </Router>  
      );
    }
    
    export default App;


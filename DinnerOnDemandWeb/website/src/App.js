import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/RecipePage';
import WelcomePage from './pages/WelcomePage';

function App() {  
  return (
    <Router >      
      <Switch>        
        <Route path="/" exact>          
          <WelcomePage />      
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
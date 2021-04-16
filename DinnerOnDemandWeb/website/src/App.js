import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/RecipePage';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/HomePageExtras/Home'
import SearchRecipe from './pages/SearchRecipe';
import NavBar from './components/NavBar';

function App() {  
  return (
    <>
      <NavBar />
      <Router >      
        <Switch>        
          <Route path="/" exact>          
            <WelcomePage />      
          </Route>        
          <Route path="/COP4331LargeProject" exact>          
            <CardPage />        
          </Route>  
          <Route path="/pages/RegisterPage" exact>          
            <RegisterPage />        
          </Route>         
          <Route path="/pages/LoginPage" exact>          
            <LoginPage />        
          </Route> 
          <Route path="/pages/HomePageExtras/Home" exact>          
            <Home />        
          </Route>
          <Route path="/pages/search">
            <SearchRecipe />
          </Route>    
          <Redirect to="/" />  
        </Switch>       
      </Router>
    </>
  );
}  
    
export default App;
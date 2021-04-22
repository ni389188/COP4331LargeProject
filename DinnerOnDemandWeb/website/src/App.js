import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/RecipePage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import SearchRecipe from './pages/SearchRecipe';
import NavBar from './components/NavBar';
import Favorites from './pages/Favorites';
import CustomRecipe from './pages/CustomRecipe';
import VerifyPage from './pages/VerifyPage';
import PWresetPage from './pages/PWresetPage';

function App() {  
  return (
    <>
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
          <Route path="/pages/HomePage" exact>          
            <HomePage />        
          </Route>
          <Route path="/pages/search">
            <SearchRecipe />
          </Route>
          <Route path="/pages/favorites">
            <Favorites />
          </Route>
          <Route path="/pages/VerifyPage" exact>          
            <VerifyPage />        
          </Route>
          <Route path="/pages/PWresetPage/:token" exact>          
            <PWresetPage />        
          </Route>
          <Route path="/pages/customs">
            <CustomRecipe />
          </Route>
          <Redirect to="/" />  
        </Switch>       
      </Router>
    </>
  );
}  
    
export default App;
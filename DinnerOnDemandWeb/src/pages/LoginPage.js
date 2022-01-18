import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import NavBar from '../components/NavBar' 

const LoginPage = () => {
    return (
       
        <div class="bg-secondary" style={{height: "100vh"}}>
            <div>
                <NavBar />
                <PageTitle />
                <Login />     
            </div>
        </div>
       
    );
};

export default LoginPage;
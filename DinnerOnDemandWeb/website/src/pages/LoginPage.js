import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import NavBar from '../components/NavBar' 

const LoginPage = () => {
    return (
        <div>
            <NavBar />
            <PageTitle />
            <Login />           
        </div>
    );
};

export default LoginPage;
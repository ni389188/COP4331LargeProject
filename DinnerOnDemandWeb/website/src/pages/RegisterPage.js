import React from 'react';

import PageTitle from '../components/PageTitle';
import Register from '../components/Register';
import NavBar from '../components/NavBar'

const RegisterPage = () => {
    return (
        <div class="bg-secondary" style={{ height: "100vh" }}>
            <NavBar />
            <PageTitle />
            <Register />
        </div>
    );
};

export default RegisterPage;
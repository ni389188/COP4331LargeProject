import React from 'react';

import PageTitle from '../components/PageTitle';
import Verify from '../components/Verify';
import NavBar from '../components/NavBar'

const VerifyPage = () => {
    return (
        <div>
            <NavBar />
            <PageTitle />
            <Verify />
        </div>
    );
};

export default VerifyPage;
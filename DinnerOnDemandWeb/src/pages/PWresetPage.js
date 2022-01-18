import React from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import PWreset from '../components/PWreset';
import NavBar from '../components/NavBar'

const PWresetPage = () => {
    var match = useParams();
    return (
        <div>
            <NavBar />
            <PageTitle />
            <PWreset tok = {match.token}/>
        </div>
    );
};

export default PWresetPage;
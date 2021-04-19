import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import RecipeUI from '../components/RecipeUI';
import NavBar from '../components/NavBar';

const RecipePage = () => {
    return (
        <div>
            <NavBar />
            <PageTitle />
            <LoggedInName />
            <RecipeUI />
        </div>
    );
}

export default RecipePage;
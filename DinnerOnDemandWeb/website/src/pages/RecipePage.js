import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import RecipeUI from '../components/RecipeUI';

const RecipePage = () => {
    return (
        <div>
            <PageTitle />
            <LoggedInName />
            <RecipeUI />
        </div>
    );
}

export default RecipePage;
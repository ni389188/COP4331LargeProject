import React, {useState, useEffect} from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import NavBar from '../components/InsideNavBar';
import Button from 'react-bootstrap/Button'
//const jwt = require("jsonwebtoken");


// import { Container } from './styles';

const Favorites = () => 
{
    const [results, setResults] = useState([]);

    useEffect(() =>
    {
        getFavorites();
    }, [])

    const app_name = 'cop4331din';

    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    };

    const getFavorites = async () =>
    {   

        // If the user data was deleted then go to login if attempt to search.
        // TO-DO: Make it so that it verifies the token instead.
        if (localStorage.getItem('user_data') === null) {
            console.log('undefined');
            window.location.href = "../pages/LoginPage";
            return;
        }

        // Takes in userID
        let userID = JSON.parse(localStorage.getItem('user_data')).userId;

        var js = JSON.stringify({ UserID: userID });

        try {
            const response = await fetch(buildPath('api/getrecipes'),
            {
                method: 'POST',
                body: js,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });

            var res = JSON.parse(await response.text());

            if (res.found)
                setResults(res.recipes)
            

        }
        catch (e) {
            console.log(e.toString());
        }   
    }

    // Deletes a recipe.
    const doDelete = async (ID) => {
        // call api/addrecipe

        var js = JSON.stringify({ID});

        try {
            const response = await fetch(buildPath('api/removerecipe'),
                {
                    method: 'POST',
                    body: js,
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });

            var res = JSON.parse(await response.text());

            if (res.removed) {
                // Returns true if the recipe was deleted.
                return true;
            }
            else {
                // Returns false if the recipe was not deleted.
                return false;
            }
        }
        catch (e) {
            console.log(e.toString());
            // return;
        }
    }

    const doRefresh = async () => {
        window.location.reload();
    }

    return (
        <>
            <div class="bg-secondary" style={{ height: "100vh" }}>
                <NavBar/>
                {
                    results.length === 0 ?
                        <Card>
                            <Card.Title>Search up some recipes and favorite them</Card.Title>
                        </Card>
                    :
                        results.map((item, index) =>
                        {
                            return(
                                <CardDeck style={{ padding: "10px" }}>
                                    <Card border="light" style={{ width: '35rem', padding: "10px" }}>
                                        <Card.Title key={index}>{item.Title}</Card.Title>
                                        <Card.Img src={item.Image}/>
                                        <div>
                                            <Button variant="danger" type="submit" size="sm" controlId="deleteButton"  
                                                onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        "Are you sure you would like to delete this recipe?"
                                                    )
                                                    if (confirmBox === true) {
                                                        
                                                        // Saves the title before removing it.
                                                        // May not be needed.
                                                        var deletedTitle = item.Title;

                                                        // If recipe is deleted returns true.
                                                        var deleted = doDelete(item._id);

                                                        // If a recipe was deleted.
                                                        if (deleted) {
                                                            // Displays which recipe was deleted.
                                                            window.alert(`${deletedTitle} was deleted`);

                                                            // Refreshes the page.
                                                            window.location.reload();
                                                        }

                                                        // If deletion failed.
                                                        else {
                                                            window.alert(`Could not delete ${deletedTitle}. Please try again.`);        
                                                        }
                                                    }
                                                }}>
                                                Delete Recipe
                                            </Button>
                                            <span id="deleteRecipe">{}</span>
                                        </div> 
                                    </Card>
                                </CardDeck>
                            )
                        })
                }
            </div>
        </>
    )
}

export default Favorites;
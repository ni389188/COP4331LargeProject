import React, {useState, useEffect} from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import NavBar from '../components/InsideNavBar';
const jwt = require("jsonwebtoken");


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
            // else

        }
        catch (e) {
            console.log(e.toString());
        }   
    }

    return (
        <>
            <div>
                <NavBar/>
                {
                    results.length === 0 ?
                        <Card>
                            <Card.Title>Search up some recipes and favorite them</Card.Title>
                        </Card>
                    :
                        results.map((item, index) =>
                        {
                            return (
                                <CardColumns>
                                    <Card>
                                        <p key={index}>{item.Title}</p>
                                    </Card>
                                </CardColumns>
                            )
                        })
                }
            </div>
        </>
    )
}

export default Favorites;
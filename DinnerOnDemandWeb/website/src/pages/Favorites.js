import React, {useState, useEffect} from 'react';
import { Card, CardDeck, Row, Col } from 'react-bootstrap';
import NavBar from '../components/InsideNavBar';
import Button from 'react-bootstrap/Button';
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

    const whatever = (item, index) => {
        return (
            <CardDeck style={{ padding: "10px" }}>
                <Card border="light" style={{ width: '35rem', padding: "10px" }}>
                    <Card.Title key={index}>{item.Title}</Card.Title>
                    <Card.Img src={item.Image} />
                    <div>
                        <Button variant="danger" type="submit" size="sm" controlId="deleteButton"
                            onClick={() => {
                                if (true) {

                                    // Saves the title before removing it.
                                    // May not be needed.
                                    var deletedTitle = item.Title;

                                    // If recipe is deleted returns true.
                                    var deleted = doDelete(item._id);

                                    // If a recipe was deleted.
                                    if (deleted) {
                                        // Refreshes the page.
                                        doRefresh(deleted);
                                    }                                    
                                }
                            }}>
                            Delete Recipe
                        </Button>
                        <span id="deleteRecipe">{ }</span>
                    </div>
                </Card>
            </CardDeck>
        )
    }

    let col_1 = []
    let col_2 = []
    let col_3 = []

    const renderResult = () => {
        results.map((item, index) => {
            let val = (index % 3) + 1

            switch (val) {
                case 1:
                    col_1.push(whatever(item, index));
                    break;
                case 2:
                    col_2.push(whatever(item, index));
                    break;
                case 3:
                    col_3.push(whatever(item, index));
                    break;
                default:
                    break;
            }
        })
    }

    // Used to await for deleted, before reloading.
    // If removed deletion will not work.
    const doRefresh = async (deleted) => {
        await deleted;
        window.location.reload();
    }

    return (
        <div class="bg-secondary" style={{ height: "100vh" }}>
            <NavBar/>
            {
                results.length === 0 ?
                    <div class="text-center">
                        <h2 class="banner">
                            Search some recipes to have them show up here. 
                        </h2>
                    </div>
                    
            :
                    <div className="container-fluid bg-secondary justify-content-center ">
                    {renderResult()}

                    <Row>
                        <Col id={"col_1"} >  {col_1}  </Col>
                        <Col id={"col_2"}>  {col_2}  </Col>
                        <Col id={"col_3"}>  {col_3} </Col>
                    </Row>
                </div>
            }          
        </div>
    )
}

export default Favorites;
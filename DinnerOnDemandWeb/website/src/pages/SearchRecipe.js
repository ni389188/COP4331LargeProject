import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import NavBar from '../components/NavBar';
import { Card } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FlatList from 'flatlist-react';

// import { Container } from './styles';

const SearchRecipe = () => {
    const [ingredients, setIngredients] = useState("")
    const [results, setResults] = useState([])

    const app_name = 'cop4331din';

    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    };

    const doSomething = async (e) => {
        e.preventDefault();

        // Call searchrecipe api
        var js = JSON.stringify({ Ingredients: ingredients.replace(" ", ""), Limit: "20" });


        try {
            const response = await fetch(buildPath('api/searchrecipe'),
                {
                    method: 'POST',
                    body: js,
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });

            var res = JSON.parse(await response.text());

            console.log(res)

            if (!res.found) {
                console.log(res.error);
            }
            else {
                setResults(res.obj)
            }
        }
        catch (e) {
            console.log(e.toString());
            // return;
        }
    }

    const addToFav = async (id, title) => {
        // call api/addrecipe
        // Takes in userID, recipeID = id, title as body
        let userID = JSON.parse(localStorage.getItem('user_data')).id;

        var js = JSON.stringify({ UserID: userID, RecipeID: id, Title: title });

        try {
            const response = await fetch(buildPath('api/addrecipe'),
                {
                    method: 'POST',
                    body: js,
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });

            var res = JSON.parse(await response.text());

            if (res.Added) {
                // Let the user know it has been added to favorites
            }
            else {
                // Let them know an error occured
            }
        }
        catch (e) {
            console.log(e.toString());
            // return;
        }
    }

    const addToShop = async (id, title) => {

    }

    let col_1 = []
    let col_2 = []
    let col_3 = []

    const doitem = (recipe) =>
    {
        return (
            <div id={recipe.key}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={recipe.image} />
                    <Card.Body>
                        <Card.Title><h4>{recipe.title}</h4></Card.Title>
                        <div>
                            <p className="card-text text-dark">
                                {
                                    [...recipe.usedIngredients, ...recipe.missedIngredients].map((ingredient, index) => {
                                        return (
                                            <div key={index}>
                                                <div style={{ flexDirection: "column", marginStart: 5, width: "80%" }}>
                                                    <p>
                                                        <h5>Ingredient: </h5>{ingredient.originalString}
                                                    </p>
                                                    <p>
                                                        Amount: {ingredient.amount}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </p>
                        </div>
                        <>
                            <ButtonGroup >
                                <Button variant="secondary" onClick={() => addToFav(recipe.id, recipe.title)}> Add To Favorites</Button>
                                <Button variant="outline-dark" onClick={() => addToShop(recipe.id, recipe.title)}> Add To Shopping List</Button>
                            </ButtonGroup>
                        </>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    const renderResult = (item) => {
        results.map((recipe, index) => {

            let val = (index % 3) + 1

            switch (val) {
                case 1:
                    col_1.push(doitem(recipe));
                    break;
                case 2:
                    col_2.push(doitem(recipe));
                    break;
                case 3:
                    col_3.push(doitem(recipe));
                    break;
                default:
                    break;
            }
        })
    }

    return (
        <>
            <NavBar />
            <div style={{ justifyContent: "center" }}>
                <form onSubmit={doSomething}>
                    <input
                        type="text"
                        placeholder="Search for Ingredients/Recipes here"
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        style={{ width: "50%" }}
                    />
                    <p>Hint: Seperate each ingredient with a comma, then Press enter when done</p>
                </form>
                {
                    results.length === 0 ?
                        <p>Search for ingredients/recipes first then the results will be displayed here.</p>
                        :
                        <container>
                            {renderResult()}
                            <Row>
                                <Col id={"col_1"}>  {col_1}  </Col>
                                <Col id={"col_2"}>  {col_2}  </Col>
                                <Col id={"col_3"}>  {col_3} </Col>
                            </Row>
                        </container>
                }
            </div>
        </>
    )
}

export default SearchRecipe;
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/InsideNavBar';
import { Card, FormText } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form'


import './searchRecipe.css'




// import { Container } from './styles';

const addIngredients = () =>
{

};

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

        if (localStorage.getItem('user_data') === null) {
            console.log('undefined');
            window.location.href = "../pages/LoginPage";
            return;
        }

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

    const addToFav = async (id, title, image, index) => {
        // call api/addrecipe
        // Takes in userID, recipeID = id, title as body
        let userID = JSON.parse(localStorage.getItem('user_data')).userId;

        var js = JSON.stringify({ UserID: userID, RecipeID: id, Title: title, Image: image});

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
                var addButton = document.getElementById(index);
                addButton.innerHTML = "Added to your Favorites!";
                addButton.disabled = true;

                return true;
            }
            else if (res.alreadyAdded) {
                window.alert("This recipe is already one of your favorites");
            }
            else {
                // Let the user know an error occured
                window.alert("An error occurred adding this recipe to your favorites. Please try again");
                return false;
            }
        }
        catch (e) {
            console.log(e.toString());
            // return;
        }
    }

    // TODO: Implement add to shopping list.
    const addToShop = async (id, title) => {

    }

    let col_1 = []
    let col_2 = []
    let col_3 = []

    const doitem = (recipe, index) => {

        return (
            <div>
                <Card controlId={recipe.key} border="light" style={{ width: '35rem', padding: "10px" }}>
                    <Card.Title>
                        {recipe.title}
                    </Card.Title>
                    <Card.Img src={recipe.image} />
                    <Card.Body>
                        {
                            [...recipe.usedIngredients, ...recipe.missedIngredients].map((ingredient, index) => {
                                return (
                                    <div key={index}>
                                        <div style={{ flexDirection: "column", marginStart: 5, width: "80%" }}>
                                            <Card.Text>
                                                <h5>Ingredient: </h5>{ingredient.originalString}<br />
                                                Amount: {ingredient.amount}<br />
                                            </Card.Text>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        
                        <ButtonGroup>
                            <Button variant="secondary" id={index} onClick={() => {

                                var result = addToFav(recipe.id, recipe.title, recipe.image, index);

                                if (result) {
                                    
                                }

                            }}>Add To Favorites</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
                <br />
            </div>
        )
    }

    const renderResult = (item) => {
        results.map((recipe, index) => {

            let val = (index % 3) + 1

            switch (val) {
                case 1:
                    col_1.push(doitem(recipe, index));
                    break;
                case 2:
                    col_2.push(doitem(recipe, index));
                    break;
                case 3:
                    col_3.push(doitem(recipe, index));
                    break;
                default:
                    break;
            }
        })
    }

    return (

        
        <div class="bg-secondary" style={{ height: "100vh" }}>
            <div className="searchRecipeCard h-auto"> 
                <NavBar />
                <br />
                <div className="container d-flex justify-content-center  "> 
                    <Form onSubmit={doSomething}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Search for Ingredients/Recipes Here"
                                value={ingredients} onChange={e => setIngredients(e.target.value)} />
                        </Form.Group>
                        <p>Hint: Seperate each ingredient with a comma, then Press enter when done</p>
                    </Form>
                </div>
                {
                    results.length === 0 ?
                        <p></p>
                        :
                        <div className="container-fluid  justify-content-center "> 
                            {renderResult()}
                        
                            <Row>
                                <Col id={"col_1"} >  {col_1}  </Col>
                                <Col id={"col_2"}>  {col_2}  </Col>
                                <Col id={"col_3"}>  {col_3} </Col>
                            </Row>               
                        </div>
                }
              </div>
        </div>
      
     
    )

}

export default SearchRecipe;
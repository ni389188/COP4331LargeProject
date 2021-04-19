import React from 'react';
import NavBar from '../components/NavBar';
import PageTitle from '../components/PageTitle';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import image1 from '../images/burger-and-fries.jpg';
import image2 from '../images/fancy-toast.jpg';
import image3 from '../images/pizza.jpg';


const WelcomePage = () => {
    return (
        <div>
            <NavBar />
            <PageTitle />
            <Card>
                <Card.Body>
                    <Card.Title>
                        What is Dinner-On-Demand?
                    </Card.Title>
                    <Card.Text>
                        Dinner-On-Demand is a platform for recipe lookup and design.<br />
                        Have no idea what to cook? Dinner-On-Demand can take in a few ingredients and help you find the perfect reciepe.<br />
                        Already have your favorite recipe? That's okay too. You can store it here to make it easy to find next time.<br />
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <CardDeck>
                <Card>
                    <Card.Title>
                        How Does It Work?
                    </Card.Title>
                    <Card.Text>
                        Once signed in you will be redirected to your dashbaord. Once their you will have the ability to create a list. 
                        This list will act as the foundation of your recipe search.
                        After making your list. You will able to look up all sorts of receipes that use those ingredients. 
                        [INSERT SCREENSHOT OF ADDING INGREDIENTS]
                    </Card.Text>
                </Card>

                <Card>
                    <Card.Title>
                        Found The Perfect Recipe?
                    </Card.Title>
                    <Card.Text>
                        After searching through recipes if you found the perfect one just save it.
                        Once saved you will always be able to fo back and look it up again.
                        [INSERT SCREENSHOT OF RECIPE SAVING]
                    </Card.Text>
                </Card>
                
                <Card>
                    <Card.Title>
                        Made Your Own Recipe?
                    </Card.Title>
                    <Card.Text>
                        Alongside the recipes you have found you can create your own recipes.
                        After your done saving recipes you can go ahead and start adding your own. 
                        [INSERT SCREENSHOT OF ADDING RECIPE]
                    </Card.Text>
                </Card>
            </CardDeck>
            <br />
            <CardDeck>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image1} alt=""/>
                    <Card.Body>
                        <Card.Title>Smackin' Burger with Fries</Card.Title>
                        <Card.Text>
                            This is a smakin burger with fries
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image2} alt="" />
                    <Card.Body>
                        <Card.Title>Gourmet Toast with Poached Egg</Card.Title>
                        <Card.Text>
                            Light toasted bread with a light spread of butter topped with 
                            Mashed Avacado and Poached Eggs
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image3} alt="" />
                    <Card.Body>
                        <Card.Title>Cheddar Cheese Pizza with Chicken, Olives, and Basil</Card.Title>
                        <Card.Text>
                            Awesome sauce pizza
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
}

export default WelcomePage;
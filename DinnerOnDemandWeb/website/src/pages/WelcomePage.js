import React from 'react';
import NavBar from '../components/NavBar';
import PageTitle from '../components/PageTitle';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Figure from 'react-bootstrap/Figure'
import image1 from '../images/Burger.png';
import image2 from '../images/Toast.png';
import image3 from '../images/Pizza.png';
import appIcon from '../images/logo.png';


const WelcomePage = () => {
    return (
        <div>
            <NavBar />
            <PageTitle />
            <Card border="light">
                <Card.Header>
                    What is Dinner-On-Demand?
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Dinner-On-Demand is a platform for recipe lookup and design.<br />
                        Have no idea what to cook? Dinner-On-Demand can take in a few ingredients and help you find the perfect reciepe.<br />
                        Already have your favorite recipe? That's okay too. You can store it here to make it easy to find next time.<br />
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <CardDeck style={{padding: "10px"}}>
                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>
                        How Does It Work?
                    </Card.Header>
                    <Card.Text>
                        Once signed in you will be redirected to your dashbaord. Once their you will have the ability to create a list. 
                        This list will act as the foundation of your recipe search.
                        After making your list. You will able to look up all sorts of receipes that use those ingredients. 
                        [INSERT SCREENSHOT OF ADDING INGREDIENTS]
                    </Card.Text>
                </Card>

                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>
                        Found The Perfect Recipe?
                    </Card.Header>
                    <Card.Text>
                        After searching through recipes if you found the perfect one just save it.
                        Once saved you will always be able to fo back and look it up again.
                        [INSERT SCREENSHOT OF RECIPE SAVING]
                    </Card.Text>
                </Card>
                
                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>
                        Made Your Own Recipe?
                    </Card.Header>
                    <Card.Text>
                        Alongside the recipes you have found you can create your own recipes.
                        After your done saving recipes you can go ahead and start adding your own. 
                        [INSERT SCREENSHOT OF ADDING RECIPE]
                    </Card.Text>
                </Card>
            </CardDeck>
            <br />
            <h2>
                Here are a few exmaples of recipes you may find on our platform:
            </h2>
            <CardDeck style={{ padding: "10px" }}>
                <br />
                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>Smackin' Burger with Fries</Card.Header>
                    <Card.Img variant="top" src={image1} alt=""/>
                    <Card.Body>
                        <Card.Text>
                            This is a smakin burger with fries
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>Gourmet Toast with Poached Egg</Card.Header>
                    <Card.Img variant="top" src={image2} alt="" />
                    <Card.Body>
                        <Card.Text>
                            Light toasted bread with a light spread of butter topped with 
                            Mashed Avacado and Poached Eggs
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                <Card border="light" style={{ width: '30rem' }}>
                    <Card.Header>Cheddar Cheese Pizza with Chicken, Olives, and Basil</Card.Header>
                    <Card.Img variant="top" src={image3} alt="" />
                    <Card.Body>
                        <Card.Text>
                            Awesome sauce pizza
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>

            <Figure>
                <Figure.Caption>
                    Try out our Mobile App!
                </Figure.Caption>
                <a href="../pages/RegisterPage">
                    <Figure.Image
                        width={150}
                        height={150}
                        alt="150x150"
                        src={appIcon}
                    />
                </a>                
            </Figure>
        </div>
    );
}

export default WelcomePage;
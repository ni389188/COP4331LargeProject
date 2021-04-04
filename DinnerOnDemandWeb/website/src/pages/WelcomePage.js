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
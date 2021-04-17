import React from 'react';
import NavBar from '../../components/NavBar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './HomePage.css';



function HomePage({
    lightBg, topLine, lightTextDesc, description, buttonName, img, alt, imgLeft
}) {
    return (
        <>
            <div
                className={lightBg ? 'homePage' : 'homePage darkBg'}
            >
                <div className="container">
                    <div className="row homeRow"
                        style={{ display: 'flex', flexDirection: imgLeft === 'left' ? 'row-reverse' : 'row' }}
                    >
                        <div className="col">
                            <div className="textWrapper">
                                <div className="textline">{topLine}</div>
                                <p className={lightTextDesc ? 'subText' : 'subText dark'}>{description}</p>
                               
                            </div >
                        </div>
                        <div className='col'>
                            <div className='imageWrapper'>
                                <img src={img} alt={alt} className='homeImage' />
                                <Link to={buttonName.includes("Search") ? '/pages/search' : '/home'}>
                                    <Button variant="primary" size="lg" block>{buttonName}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default HomePage;
import React from 'react'
import NavBar from '../../components/NavBar'
import HomePage from '../LoggedIn/HomePage'
import {homeObject1,homeObject2,homeObject3} from './Data'


function Home() {
    return (
        <>
            <NavBar />
            <HomePage {...homeObject1} /> 
            <HomePage {...homeObject2} /> 
            <HomePage {...homeObject3} /> 
        </>
    )
}

export default Home

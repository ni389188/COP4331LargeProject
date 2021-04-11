import React from 'react'
import HomePage from '../HomePage'
import {homeObject1,homeObject2,homeObject3} from './Data'


function Home() {
    return (
        <>
        <HomePage {...homeObject1} /> 
        <HomePage {...homeObject2} /> 
        <HomePage {...homeObject3} /> 
    
        </>
    )
}

export default Home

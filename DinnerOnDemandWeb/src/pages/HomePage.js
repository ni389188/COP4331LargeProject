import React from 'react'
import Home from '../components/Home'
import {homeObject1,homeObject2,homeObject3} from '../components/Data'
import InsideNavBar from '../components/InsideNavBar'
import Delete from '../components/Delete'


function HomePage() {
    return (
        <>
            <InsideNavBar />
            <Home {...homeObject1} /> 
            <Home {...homeObject2} /> 
            <Home {...homeObject3} /> 
            <Delete />

        </>
    )
}

export default HomePage;


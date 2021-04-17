import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
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
        // call api/getrecipe
        // Takes in userID
        let userID = JSON.parse(localStorage.getItem('user_data')).id;

        var js = JSON.stringify({ userID: userID });

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
            // else

        }
        catch (e) {
            console.log(e.toString());
        }
    }

    return (
        <>
            <div>
                {
                    results.length === 0 ?
                        <div>
                            <p>Search up some recipes and favorite them</p>
                        </div>
                    :
                        results.map((item, index) =>
                        {
                            return (
                                <div>
                                    <p key={index}>{item.Title}</p>
                                </div>
                            )
                        })
                }
            </div>
        </>
    )
}

export default Favorites;
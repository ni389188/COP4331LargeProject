import React from 'react';
import Button from 'react-bootstrap/Button'

function Delete() {
    return (
        <div>
            <Button variant="danger" type="submit" size="lg" controlId="deleteButton" block 
                onClick={() => {
                    const confirmBox = window.confirm(
                        "Are you sure you would like to delete your account?"
                    )
                    if (confirmBox === true) {
                        let userID = JSON.parse(localStorage.getItem('user_data')).userId;
                        var deleted = doDelete(userID);

                        if (deleted)
                        {
                            if (deleted) {
                                window.alert(`Your account was deleted`);
                                
                                // Deleted token.
                                localStorage.clear();
                                // Refreshes the page.
                                window.location.href = "../pages/LoginPage";
                            }
                        }
                    }
                }}>
                Delete Account
            </Button>
            <span id="deleteResult">{}</span>
        </div>
    );
};

const app_name = 'cop4331din';

const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
};

const doDelete = async (ID) => {
    // call api/addrecipe

    var js = JSON.stringify({_id:ID});

    try {
        const response = await fetch(buildPath('api/delete'),
            {
                method: 'POST',
                body: js,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });

        var res = JSON.parse(await response.text());

        if (res.deleted) {
            // Returns true if the recipe was deleted.
            return true;
        }
        else {
            // Returns false if the recipe was not deleted.
            return false;
        }
    }
    catch (e) {
        console.log(e.toString());
        // return;
    }
}

export default Delete;
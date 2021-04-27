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
                        
                    }
                }}>
                Delete Account
            </Button>
            <span id="deleteResult">{}</span>
        </div>
    );
};

export default Delete;
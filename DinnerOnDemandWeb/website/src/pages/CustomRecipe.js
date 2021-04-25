import React, { useState } from 'react';
import NavBar from '../components/InsideNavBar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { Container } from './styles';

const CustomRecipe = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    // const [ingredients, setIngredients] = useState([]);
    const [units, setUnits] = useState([""]);
    // const [instructions, setInstructions] = useState([]);
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const app_name = 'cop4331din';

    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    };

    const addRecipe = async () => {
        
        // If the user data was deleted then go to login if attempt to search.
        // TO-DO: Make it so that it verifies the token instead.
        if (localStorage.getItem('user_data') === null) {
            console.log('undefined');
            window.location.href = "../pages/LoginPage";
            return;
        }

        var list = document.getElementById('ingredientsList').getElementsByTagName("li");

        let temp1 = [];

        for (let i = 0; i < list.length; i++)
            temp1.push(list[i].innerText);

        list = document.getElementById('instructionsList').getElementsByTagName("li");

        let temp = [];

        for (let i = 0; i < list.length; i++)
            temp.push(list[i].innerText);

        // Call addcustomrecipe api
        // Takes userID, title, image, ingredients, units, instructions
        let userID = JSON.parse(localStorage.getItem('user_data')).userId;

        var js = JSON.stringify(
            {
                UserID: userID,
                Title: title,
                Image: image,
                Ingredients: temp1,
                Units: units,
                Instructions: temp
            });

        try {
            const response = await fetch(buildPath('api/addcustomrecipe'),
                {
                    method: 'POST',
                    body: js,
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });

            var res = JSON.parse(await response.text());

            console.log(res)

            if (res.Added) {
                // let the user know
                document.getElementById("added").innerHTML = "Custom Recipe has been added!";
            }
            else {
                // let them know it hasnt
                document.getElementById("added").innerHTML = res.error;
            }
        }
        catch (e) {
            console.log(e.toString());
        }
    }

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
                setImage(current.src);
                // console.log(current.src)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="searchRecipeCard">
                <NavBar />
                <div>
                    <div className="container  justify-content-center  mt-5 bg-dark ">
                        <Form >
                            <Form.Group controlId="formTitle " className="text-white ">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formIngredients" className="text-white ">
                                <Form.Label>Ingredients</Form.Label>
                                <div className="container  justify-content-center bg-secondary ">
                                    <div id="ingredientsList" class="editable" contentEditable="true">
                                        <ul>
                                            <li>List items</li>
                                        </ul>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formInstructions ">
                                <Form.Label className="text-white ">Instructions</Form.Label>
                                <div className="container  justify-content-center bg-secondary ">
                                    <div id="instructionsList" class="editable" contentEditable="true">

                                        <ul>
                                            <li className="text-white ">List items</li>
                                        </ul>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    ref={imageUploader}
                                    style={{
                                        display: "none"
                                    }}
                                />
                                <div
                                    style={{
                                        height: "50%",
                                        width: "50%",
                                        border: "1px dashed black"
                                    }}
                                    onClick={() => imageUploader.current.click()}
                                >
                                    <img
                                        ref={uploadedImage}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <p className="text-white ">Click box to add image (optional)</p>

                            </Form.Group>
                            <Button style={{marginBottom: 10}} class=" btn-block btn-lg mb-5" variant="light" onClick={() => addRecipe()}>Add Recipe</Button>
                            <p style={{marginBottom: 10}} id="added"></p>
                        </Form >
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomRecipe;
import React, { useEffect, useState } from 'react';
import NavBar from '../components/InsideNavBar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ButtonGroup, Card, Col, Row } from 'react-bootstrap';
// import { Container } from './styles';

const CustomRecipe = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    // const [ingredients, setIngredients] = useState([]);
    const [units, setUnits] = useState([""]);
    // const [instructions, setInstructions] = useState([]);
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const [results, setResults] = useState([]);

    let col_1 = []
    let col_2 = []
    let col_3 = []

    useEffect(() =>
    {
        getCustom();
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
                getCustom();
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

    const deleteCustom = async (item) =>
    {
      var js = JSON.stringify({ID: item._id});
  
      try {
        const response = await fetch(buildPath('api/removecustom'),
          {
            method: 'POST',
            body: js,
            headers:
            {
              'Content-Type': 'application/json'
            }
          });
  
        var res = JSON.parse(await response.text());
  
        console.log(res);
  
        if (res.removed) {
            getCustom()
        }
      }
      catch (e)
      {
        // setSuccess(e.toString());
        // setVisible(true);
        // return;
      }
    }

    const doitem = (recipe, index) =>
    {
        return (
            <div>
                <Card controlId={index} border="light" style={{ width: '35rem', padding: "10px" }}>
                    <Card.Title>
                        {recipe.Title}
                    </Card.Title>
                    <Card.Img src={recipe.Image} />
                    <Card.Body>
                        <h3>Ingredients</h3>
                        {
                            recipe.Ingredients.map((ingredient, index) =>
                            {
                                return (
                                    <div key={index}>
                                        <div style={{ flexDirection: "column", marginStart: 5, width: "80%" }}>
                                            <Card.Text>
                                                <h5>{index + 1}: {ingredient}</h5><br />
                                            </Card.Text>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <h3>Instructions</h3>
                        {
                            recipe.Instructions.map((instruction, index) =>
                            {
                                return (
                                    <div key={index}>
                                        <div style={{ flexDirection: "column", marginStart: 5, width: "80%" }}>
                                            <Card.Text>
                                                <h5>{index + 1}: {instruction}</h5><br />
                                            </Card.Text>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <ButtonGroup>
                            <Button variant="secondary" onClick={() => deleteCustom(recipe)}>Delete</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
                <br />
            </div>
        )
    }

    const getCustom = async () =>
    {
        setResults([])

        let userID = JSON.parse(localStorage.getItem('user_data')).userId;

        // call api/getcustomrecipes
        // Takes in userID
        var js = JSON.stringify({ UserID: userID });

        try {
            const response = await fetch(buildPath('api/getcustomrecipes'),
            {
                method: 'POST',
                body: js,
                headers:
                {
                'Content-Type': 'application/json'
                }
            });

            var res = JSON.parse(await response.text());

            if (res.found) {
                setResults(res.recipes)
                // renderResult()
            }
        }
        catch (e) {
            console.log(e.toString());
        }
    }

    const renderResult = () => {
        results.map((item, index) => {
            let val = (index % 3) + 1

            switch (val) {
                case 1:
                    col_1.push(doitem(item, index));
                    break;
                case 2:
                    col_2.push(doitem(item, index));
                    break;
                case 3:
                    col_3.push(doitem(item, index));
                    break;
                default:
                    break;
            }
        })
    }

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
                    <div className="container-fluid  justify-content-center ">
                        {renderResult()}
                        <Row>
                            <Col id={"col_1"} > {col_1}  </Col>
                            <Col id={"col_2"}>  {col_2}  </Col>
                            <Col id={"col_3"}>  {col_3}  </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomRecipe;
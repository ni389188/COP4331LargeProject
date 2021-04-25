const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const path = require('path');

const PORT = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////////////////////// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{  // Set static folder  
    app.use(express.static('website/build'));
    
    app.get('*', (req, res) =>  
    {    
        res.sendFile(path.resolve('DinnerOnDemandWeb', 'website', 'build', 'index.html')); // changed frontend to websiteb bc thats what its called for ours
    });
}

var userRoutes = require("./ServerComponents/userApi.js");
userRoutes.setApp(app);

var recipeRoutes = require("./ServerComponents/recipeApi.js");
recipeRoutes.setAppRecipe(app);

var accountRoutes = require("./ServerComponents/accountApi.js");
accountRoutes.setApp(app);

var customRecipe = require("./ServerComponents/customRecipeApi.js");
customRecipe.setAppCustomRecipe(app);

// **********************HARD CODED API*********************************

var recipeList = [  'Tomato',  'Cheese',  'Apple',  'Pepper',  'Potato'];
app.post('/api/addrecipe', async (req, res, next) =>
{  
    // incoming: userId, color  
    // outgoing: error  
    const { userId, recipe } = req.body;  
    const newRecipe = {Recipe:recipe,UserId:userId};  
    var error = '';  
    
    try  
    {    
        const db = client.db();    
        const result = db.collection('Recipes').insertOne(newRecipe);  
    }  
    catch(e)  
    {    
        error = e.toString();  
    }
    recipeList.push( recipe );  
    var ret = { error: error };  
    res.status(200).json(ret);
});

// **********************HARD CODED API*********************************

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.listen(PORT, () => 
{  
    console.log('Server listening on port ' + PORT);
});
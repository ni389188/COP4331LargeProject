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
        res.sendFile(path.resolve(__dirname, 'website', 'build', 'index.html')); // changed frontend to websiteb bc thats what its called for ours
    });
}

var userRoutes = require("./ServerComponents/userApi.js");
userRoutes.setApp(app);

var recipeRoutes = require("./ServerComponents/recipeApi.js");
recipeRoutes.setAppRecipe(app);

var customRecipeRoutes = require("./ServerComponents/customRecipeApi");
customRecipeRoutes.setAppCustomRecipe(app);

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

//app.listen(5000); // start Node + Express server on port 5000

app.listen(PORT, () => 
{  
    console.log('Server listening on port ' + PORT);
});
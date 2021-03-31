//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
//create server
const app = express();
//Create mongo client
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
//set ports
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

//API
app.post('/api/login', async (req, res, next) => 
{  
    const email = req.body.Email;
    const password = req.body.Password;  
    const db = client.db();
    const results = await db.collection('Users').find({Email:email,Password:password}).toArray(); 
    if( results.length )  
    {       
        var ret =  { FirstName:results[0].FirstName, LastName:results[0].LastName, Email:results[0].Email, Err:0};
    } 
    else
    {
        var ret = {Err:1}; 
    }
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{  
    const db = client.db();
    const AccountExists = await db.collection('Users').find({Email:req.body.Email}).toArray(); 
    console.log(AccountExists.length);
    if(AccountExists.length)
    {
        var ret = {Err:1};
    }  
    else
    {
        var ret = await db.collection('Users').insertOne(req.body);
    }
    res.status(200).json(ret);
});

//start mongoDB client
client.connect();

//start server
app.listen(PORT, () => 
{  
    console.log('Server listening on port ' + PORT);
});
const express = require('express');
const jwt = require('../createJWT');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')();

const User = require('./models/user.model');

exports.setApp = function (app, MongoClient)
{
    app.post('/api/register', async (req, res, next) => 
    {  
        const newUser = new User({ 
            _id: new mongoose.Types.ObjectId(),
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            Email: req.body.Email, 
            Password: req.body.Password
        });
        // Stores into the DB.
        newUser.save().then(result => {

            ret = jwt.createToken( newUser.FirstName, newUser.LastName, newUser._id);
            res.status(200).json(ret);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });

    app.post('/api/login', async (req, res, next) => 
    {  
        var email = req.body.Email;
        var password = req.body.Password;
        User.findOne({Email:email, Password:password}, function(err, result) {
            // Error Encountered.
            if(err) {
                res.status(400).json(err);
            }

            // If found
            if (result){
                ret = jwt.createToken( result.FirstName, result.LastName, result._id);
                ret.LoggedIn = true;
                res.status(200).json(ret);
            }

            // If not found
            else {
                console.log('Failed Login');
                res.status(400).json({loggedIn:false});
            }
        })
    });
}
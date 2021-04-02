const express = require('express');

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

            res.status(200).json({
                ID: result._id,
                FirstName: result.FirstName,
                LastName: result.LastName,
                Email: result.Email
            });
        })
        .catch(err => {
            console.log(err);

            res.status(400).json(err);
        });
    });

    app.post('/api/login', async (req, res, next) => 
    {  
        var Email = req.body.login;
        var Password = req.body.password;

        User.findOne({Email:Email, Password:Password}, function(err, result) {

            // Error Encountered.
            if(err) {
                res.status(400).json(err);
            }

            // If found
            if (result){
                res.status(200).json({
                    ID: result._id,
                    FirstName: result.FirstName,
                    LastName: result.LastName,
                    loggedIn: true
                })
            }

            // If not found
            else {
                console.log('Failed Login');
                res.status(400).json({loggedIn:false});
            }
        })
    });
}
const express = require('express');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')();

const User = require('./models/user.model');

const sha256 = require('crypto-js/sha256');


exports.setApp = function (app, MongoClient)
{
    app.post('/api/register', async (req, res, next) => 
    {  
        var randomNumber = Math.random().toString().substr(2,4);

        // Concats "cop4331" and password before hashing.
        var hashedPassword = sha256("cop4331" + req.body.Password).toString();

        const newUser = new User({ 
            _id: new mongoose.Types.ObjectId(),
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            Email: req.body.Email, 
            Password: hashedPassword,
            VerificationCode: randomNumber,
            IsVerified: false
        });
        
        // Stores into the DB.
        newUser.save().then(result => {

            res.status(200).json({
                ID: result._id,
                FirstName: result.FirstName,
                LastName: result.LastName,
                Email: result.Email,
                VerificationCode: result.VerificationCode
            });
        })
        .catch(err => {
            console.log(err);

            res.status(400).json(err);
        });
    });

    app.post('/api/login', async (req, res, next) => 
    {  
        var Email = req.body.Email;

        // Concats "cop4331" and password before hashing.
        var hashedPassword = sha256("cop4331" + req.body.Password).toString();


        User.findOne({Email:Email, Password:hashedPassword}, function(err, result) {

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
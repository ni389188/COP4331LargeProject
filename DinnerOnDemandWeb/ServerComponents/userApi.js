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
        // incoming: login, password  
        // outgoing: id, firstName, lastName, error 
        
        /*var error = '';  
        const { login, password } = req.body;  
        const db = client.db();  
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();  
        var id = -1;  
        var fn = '';  
        var ln = '';  
        if( results.length > 0 )  
        {    
            id = results[0].UserId;    
            fn = results[0].FirstName;    
            ln = results[0].LastName;  
        }  
        var ret = { id:id, firstName:fn, lastName:ln, error:''};  
        res.status(200).json(ret);*/

        var Email = req.body.Email;
        var Password = req.body.Password;

        User.findOne({Email:Email, Password:Password}, function(err, result) {
            if(err) {
                res.status(400).json(err);
            }

            if (result) {
                res.status(200).json({
                    ID: result._id,
                    FirstName: result.FirstName,
                    LastName: result.LastName
                })
            }
        })
    });
}
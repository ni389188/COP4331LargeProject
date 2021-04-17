const express = require('express');
const jwt = require('../createJWT');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')();
 
const User = require('./models/user.model');
const sha256 = require('crypto-js/sha256');

exports.setApp = function (app, MongoClient)
{
    app.post('/api/register', async (req, res, next) => 
    {  
        var randomNumber = Math.random().toString().substr(2,4);
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

            ret = jwt.createToken( result.FirstName, result.LastName, result._id, );
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
        var hashedPassword = sha256("cop4331" + req.body.Password).toString();
        User.findOne({Email:email, Password:hashedPassword}, function(err, result) {
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

    app.post('/api/update', async (req, res, next) => 
    {  
        var obj = {};
        if(req.body.FirstName != '' && req.body.FirstName != undefined)
        {
            obj.FirstName = req.body.FirstName;
        }
        if(req.body.LastName != '' && req.body.LastName != undefined)
        {
            obj.LastName = req.body.LastName;
        }
        if(req.body.password != '' && req.body.Password != undefined)
        {
            await User.findById(req.body._id, function(err, result) {
                if (result.Password == sha256("cop4331" + req.body.OldPassword).toString()){
                    obj.Password = sha256("cop4331" + req.body.Password).toString();
                }
            })
            if(obj.Password == undefined)
            {
                res.status(400).json("Current password is incorrect");
                return;
            }
        }
        console.log("hi")
        // Update user DB.
        User.findByIdAndUpdate(req.body._id, obj, {new: true}).then(result => {
            ret = jwt.createToken( result.FirstName, result.LastName, result._id, );
            res.status(200).json(ret);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });

    app.post('/api/delete', async (req, res, next) => 
    {  
        // Update user DB.
        User.findByIdAndRemove(req.body._id).then(result => {
            res.status(200).json("success");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });
}
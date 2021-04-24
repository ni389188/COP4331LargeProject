const express = require('express');
const jwt = require('../createJWT');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')();
 
const User = require('./models/user.model');
const sha256 = require('crypto-js/sha256');
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN});

exports.setApp = function (app, MongoClient)
{
    app.post('/api/register', async (req, res, next) => 
    {  
        var ret;
        var randomNumber = Math.random().toString().substr(2,4);
        var hashedPassword = sha256("cop4331" + req.body.Password).toString();
        const newUser = new User({ 
            _id: new mongoose.Types.ObjectId(),
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            Email: req.body.Email, 
            Password: hashedPassword,
            Image: null,
            VerificationCode: randomNumber,
            IsVerified: false
        });
        // Stores into the DB.
        await newUser.save().then(result => {
            ret = jwt.createToken( result.FirstName, result.LastName, result._id, result.Image);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
        var data;
        if(process.env.NODE_ENV === 'production')
        {
            data = {
                from: "Dinnerondemand <NoReply@"+process.env.MAILGUN_DOMAIN+">",
                to: req.body.Email,
                subject: "Dinner on demand: Please verify your Email",
                text: "Please confirm your email to activate your account! www.dinnerondemand.com/api/verify/"+randomNumber+"/"+ret.accessToken
            };
        }
        else
        {
            data = {
                from: "Dinnerondemand <NoReply@"+process.env.MAILGUN_DOMAIN+">",
                to: req.body.Email,
                subject: "Dinner on demand: Please verify your Email",
                text: "Please confirm your email to activate your account! http://localhost:5000/api/verify/"+randomNumber+"/"+ret.accessToken
            };
        };
        try
        {
            mailgun.messages().send(data, function (error, body) {
                console.log(body);
                ret.notification = "An email to verify your account was sent to "+req.body.Email;
                res.status(200).json(ret);
            });
        }
        catch(e)
        {
            console.log(e);
            res.status(400).json(e);
        }
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
                ret = jwt.createToken( result.FirstName, result.LastName, result._id, result.Image);
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
        if(req.body.Image != '' && req.body.Image != undefined)
        {
            obj.Image = req.body.Image;
        }
        if(req.body.Password != '' && req.body.Password != undefined)
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
        if(obj == {})
        {
            res.status(200).json("empty");
            return;
        };
        // Update user DB.
        User.findByIdAndUpdate(req.body._id, obj, {new: true}).then(result => {
            ret = jwt.createToken( result.FirstName, result.LastName, result._id, result.Image);
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
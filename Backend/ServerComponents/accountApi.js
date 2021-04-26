const express = require('express');
const jwt = require("jsonwebtoken");
const createTok = require('../createJWT');

const mongoose = require('mongoose');
 
const User = require('./models/user.model');
const sha256 = require('crypto-js/sha256');
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN});

exports.setApp = function (app, MongoClient)
{
    
    app.post('/api/reset', async (req, res, next) =>
    {
        var tok;
        const message = "An email was sent to "+req.body.Email;
        await User.findOne({Email:req.body.Email}, function(err, result) {
            // Error Encountered.
            if(err) {
                console.log(err)
            }
            // If found
            if (result){
                tok = createTok.createToken( result.FirstName, result.LastName, result._id, result.Image);
            }
        });

        // Token could not be created, thus account does not exist.
        if(!tok)
        {
            //NOTE: Remove 400 response when account is not found. This can 
            //      be used by an attacker to find out if an email has an account.
            res.status(200).json({message});
            return;
        };
        
        var data;
        if(process.env.NODE_ENV === 'production')
        {
            data = {
                from: "Dinnerondemand <NoReply@"+process.env.MAILGUN_DOMAIN+">",
                to: req.body.Email,
                subject: "Dinner on demand: Password recovery",
                text: "A request to recover your password was made. Please follow this link if you made this request.\nhttp://www.dinnerondemand.me/api/reset/"+tok.accessToken
            };
        }
        else
        {
            data = {
                from: "Dinnerondemand <NoReply@"+process.env.MAILGUN_DOMAIN+">",
                to: req.body.Email,
                subject: "Dinner on demand: Password recovery",
                text: "A request to recover your password was made. Please follow this link if you made this request.\nhttp://localhost:5000/api/reset/"+tok.accessToken
            };
        };
        try
        {
            mailgun.messages().send(data, function (error, body) {
                console.log(body);
                res.status(200).json(message);
            });
        }
        catch(e)
        {
            console.log(e);
            res.status(400).json("Error sending email");
        }
    });

    app.post('/api/reset/confirm', async (req, res, next) =>
    {
        try
        {
            if(req.body.Password == '' || req.body.Password == undefined)
            {
                res.status(400).json("Please enter all fields");
                return;
            };
            await User.findByIdAndUpdate(req.body._id, {Password:sha256("cop4331"+req.body.Password).toString()}).then(result => 
            {
                if(result!=null)
                {
                    res.status(200).json("Password updated successfully!");
                }
                else
                {
                    res.status(400).json("Failed to update password");
                }
            });
        }
        catch(e)
        {
            console.log(e);
            res.status(400).json(e)
        }
    });

    app.get('/api/reset/:token', async (req, res, next) =>
    {
        try
        {

            // Checks if token signature is valid. Using the Secret in the .env file.
            var tok = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET);

            // After decoding: Find the user by the userId contained in the token.
            User.findById(tok.userId, function(err, result) {
                // If an user is found.
                if(result){
                    if(process.env.NODE_ENV === 'production')
                    {
                        res.redirect("/pages/PWresetPage/"+req.params.token);
                    }
                    else
                    {
                        res.redirect("http://localhost:3000/pages/PWresetPage/"+req.params.token);
                    }
                    res.status(200);
                }
                else
                {
                    res.status(400);
                }
            })
        }
        catch(e)
        {
            res.status(400);
        };
    });

    app.post('/api/verify/:verificationCode/:token', async (req, res, next) =>
    {
        try
        {   
            
            // Checks if token signature is valid. Using the Secret in the .env file.
            var tok = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET);

            // Finds user by userId in token.
            await User.findById(tok.userId, function(err, result) {
                // verification code in DB is the same as in the ger request param.
                if(result.VerificationCode == req.params.verificationCode){
                    // Update user IsVerified field to true.
                    User.findByIdAndUpdate(tok.userId, {IsVerified: true, $unset:{"VerificationCode":1}}).then(result => {
                        if(process.env.NODE_ENV === 'production')
                        {
                            res.redirect("/pages/VerifyPage");
                        }
                        else
                        {
                            res.redirect("http://localhost:3000/pages/VerifyPage");
                        }
                        res.status(200);
                    })
                }
                else
                {
                    res.status(400);
                }
            })
        }
        catch(e)
        {
            res.status(400);
        };
    });

    app.post('/api/resend', async (req, res, next) =>
    {
        try
        {
            var randomNumber;
            await User.findOne({Email:req.body.Email}, function(err, result) {
                if(result){
                    ret = createTok.createToken( result.FirstName, result.LastName, result._id, result.Image);
                    randomNumber = result.VerificationCode;
                }
            });
            if(!ret)
            {
                res.status(400).json(false);
                return;
            };
            if(process.env.NODE_ENV === 'production')
            {
                data = {
                    from: "Dinnerondemand <NoReply@"+process.env.MAILGUN_DOMAIN+">",
                    to: req.body.Email,
                    subject: "Dinner on demand: Please verify your Email",
                    text: "Please confirm your email to activate your account! www.dinnerondemand.me/api/verify/"+randomNumber+"/"+ret.accessToken
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
            mailgun.messages().send(data, function (error, body) {
                console.log(body);
                res.status(200).json(true);
            });
        }
        catch(e)
        {
            res.status(400).json(false);
        };
    });
}
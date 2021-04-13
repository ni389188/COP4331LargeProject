const jwt = require('../createJWT');

exports.setApp = function (app, client)
{
    app.post('/api/mobile/login', async (req, res, next) => 
    {  
        const email = req.body.Email;
        const password = req.body.Password;  
        const db = client.db();
        const results = await db.collection('Users').find({Email:email,Password:password}).toArray(); 
        var id = -1;
        var fn = '';
        var ln = '';
        if( results.length )  
        {       
            id = results[0]._id;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        } 
        try
        {
            if(id != -1)
            {
                ret = jwt.createToken( fn, ln, id );
            }
            else
            {
                ret = {error:"Invalid Username or Password"};
            }
        }
        catch(e)
        {
            ret = {error:e.message};
        }
        res.status(200).json(ret);
    });

    app.post('/api/mobile/register', async (req, res, next) => 
    {  
        const db = client.db();
        const AccountExists = await db.collection('Users').find({Email:req.body.Email}).toArray(); 
        try
        {
            if(AccountExists.length)
            {
                var ret = {error:"Email is already in use"};
            }
            else
            {
                await db.collection('Users').insertOne(req.body);
                var ret = jwt.createToken( req.body.firstName, req.body.lastName, req.body._id );
            }
        }
        catch(e)
        {
            ret = {error:e.message};
        }
        res.status(200).json(ret);
    });
}
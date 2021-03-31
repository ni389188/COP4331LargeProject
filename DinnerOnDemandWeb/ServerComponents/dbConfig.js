const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 

module.exports = () => {
 config(); //invoking the dotenv config here
 const uri = process.env.MONGODB_URI;

 connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Connection established with MongoDB');
        })
        .catch(error => console.error(error.message));
}
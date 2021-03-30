const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true,
}

const userModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: reqString, 
    LastName: reqString, 
    Email: {
        type: String,
        unique: true,
        required: true
    }, 
    Password: reqString,
})
userModel.plugin(uniqueValidator)

module.exports = mongoose.model('Users', userModel, 'Users')
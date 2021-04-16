const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true,
}

const userModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: {
        type: String,
        unique: true,
        required: true
    }, 
    Password: reqString,
    FirstName: reqString, 
    LastName: reqString, 
    VerificationCode: reqString,
    IsVerified: {
        type: Boolean,
        required: true
    } 
})
userModel.plugin(uniqueValidator)

module.exports = mongoose.model('Users', userModel, 'Users')
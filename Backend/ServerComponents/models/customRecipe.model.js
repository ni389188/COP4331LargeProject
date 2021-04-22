const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqArray = {
    type: [String],
    required: true
}

const CustomRecipeModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserID: reqString,
    Title: reqString,
    Image: {type: String},
    Ingredients: reqArray,
    Units: reqArray,
    Instructions: reqArray
})

module.exports = mongoose.model('CustomRecipes', CustomRecipeModel, 'CustomRecipes')
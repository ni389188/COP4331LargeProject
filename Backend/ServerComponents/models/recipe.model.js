const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true,
}

const recipeModel = mongoose.Schema({
    CompositeID: {
        type: String,
        unique: true,
        required: true
    }, 
    UserID: reqString,
    
    RecipeID: {
        type: Number,
        required: true,
    },
    Title: reqString, 

    // These two fields are not required so that mobile does not have
    // To implement this chages.
    Image: {
        type: String,
        required: false
    },
    Ingredients: {
        type: [String],
        required: false
    }
})
recipeModel.plugin(uniqueValidator)

module.exports = mongoose.model('Recipes', recipeModel, 'Recipes')
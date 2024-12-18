const mongoose = require("mongoose")
 const savedRecipeSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
 })

 const saveRecipes = mongoose.model("saveRecipes",savedRecipeSchema)
 module.exports = saveRecipes
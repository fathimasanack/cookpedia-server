const saveRecipes = require('../models/saveRecipeModel')

// add to collection
exports.saveRecipeController=async (req,res) => {
    console.log("inside saveRecipeController");
    const {id}=req.params
    const userId=req.userId
    const {name,image} = req.body
    try {
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json("Recipe already in Saved Collection")
        }else{
            const newRecipe = new saveRecipes({recipeId:id,name,image,userId})
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// user recipe collection get -authorised user
exports.getUserSavedRecipeController = async(req,res) =>{
    console.log("inside getUserSavedRecipeController ");
    // get userid to get user recipe collection
    const userId = req.userId
    try{
        const userRecipeCollection = await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }catch(err){
        res.status(401).json(err)
    }
    
}
// remove save recipe -authorised user
exports.removeSaveRecipeController = async(req,res)=>{
    console.log("inside removeSaveRecipeController");
    // get item _id to be removed from req params
    const {id} = req.params
    // remove item from collection using findByIdandDelete
    try{
        const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)
    }catch(err){
        res.status(401).json(err)
    }
    
}
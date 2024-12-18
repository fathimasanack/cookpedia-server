const recipes = require('../models/recipeModel')

exports.getAllRecipeController = async(req,res)=>{
    console.log("inside getAllRecipeController ");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)


    }catch(err){
        res.status(401).json(err)

    }
    
}

exports.getRecipeController = async (req,res)=>{
    console.log("inside getRecipeController");
     const {id} = req.params

     try{
        const recipeDetails = await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)

     }catch(err){
        res.status(401).json(err)

     }
    
}

exports.relatedRecipeController = async(req,res)=>{
    console.log("inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allRelatedRecipes = await recipes.find({cuisine})
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// addRecipe
exports.addRecipeController = async(req,res)=>{
    console.log("inside addRecipeController ");
    //    get all data from req body
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{
        // check recipe already in model
        const existingRecipe = await recipes.findOne({name})

        if(existingRecipe){
            res.status(406).json("Recipe already exist in our collection .Add another")
        }else{
            // recipe not in model  then insert the recipe

            const newRecipe = new recipes({
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType

            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }


    }catch(err){
        res.status(401).json(err)
    }


    
}

exports.updatRecipeController = async(req,res)=>{
    console.log("inside updatRecipeController");
    //  get id of recipe should be updated
    const {id} = req.params
    // get update recipe details from req.body

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
//   find recipe name is already exist

   try{
    
    
        const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType

        },{new:true})
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    
   }catch(err){
    res.status(401).json(err)
   }
}

exports.removeRecipeController = async(req,res)=>{
    console.log("inside removeRecipeController");

    const {id} = req.params

    try{
          const removeRecipe = await recipes.findByIdAndDelete({_id:id})
          res.status(200).json(removeRecipe)

    }catch(err){
        res.status(401).json(err)
    }
    
}
    

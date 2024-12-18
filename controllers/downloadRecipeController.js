const downloadRecipes = require('../models/downloadModel')

// add to downloadRecipes
exports.addToDownloadRecipeController = async(req,res)=>{
    console.log("inside addToDownloadRecipeController ");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    console.log(id,name,image,cuisine,userId);
    try{
        // check recipe already in download
        const exisitingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(exisitingRecipe){
            // 
            exisitingRecipe.count +=1
            await exisitingRecipe.save()
            res.status(200).json(exisitingRecipe)
        }else{
            const newRecipe = new downloadRecipes({
                recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
    


    
}

exports.getUserDownloadListController = async(req,res)=>{
    console.log("inside getUserDownloadListController");

    const userId = req.userId
    try{
        const allUserDownloads = await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all download recipes
exports.getAllDownloadListController = async(req,res)=>{
    console.log("inside getUserDownloadListController");
    // find all documents from model

    try{
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    }catch(err){
        res.status(401).json(err)
    }
    
}
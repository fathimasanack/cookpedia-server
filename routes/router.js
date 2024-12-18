const express =  require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadRecipeController= require('../controllers/downloadRecipeController')
const saveRecipeController = require('../controllers/saveRecipeController')

const router = new express.Router()

router.get("/all-recipes",recipeController.getAllRecipeController)

// add-testimony
router.post("/add-testimony",testimonyController.addTestimonyController)
// add-user
router.post("/register",userController.addUserController)
// login
router.post("/login",userController.loginController)
// 
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getRecipeController)
// related recipes
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipeController)

// downloadrecipe
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipeController.addToDownloadRecipeController)

// saverecipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.saveRecipeController)

// getuserrecipe
router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getUserSavedRecipeController)

router.delete("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeSaveRecipeController)

router.get("/user-downloads",jwtMiddleware,downloadRecipeController.getUserDownloadListController)

router.post("/user/edit", jwtMiddleware,userController.editUserController)

router.get("/all-users",jwtMiddleware,userController.getAllUsersController)

router.get("/download-list",jwtMiddleware,downloadRecipeController.getAllDownloadListController)

router.get("/all-feedbacks",jwtMiddleware,testimonyController.getAllFeedbackController)

router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateFeedbackStatusController)

router.get("/all-approve-feedback",testimonyController.getApprovedController)

router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

router.put("/recipe/:id/edit",jwtMiddleware,recipeController.updatRecipeController)

router.delete("/recipes/:id/remove",jwtMiddleware,recipeController.removeRecipeController)














module.exports = router
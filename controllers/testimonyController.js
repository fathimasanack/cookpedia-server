const testimonials = require("../models/testimonyModel")


exports.addTestimonyController = async (req,res)=>{
    console.log("inside addTestimonyController");
    const {name,email,message} = req.body

    try{
        const newTestimony = new testimonials({
            name,email,message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all feedback
exports.getAllFeedbackController = async(req,res)=>{
    console.log("inside getAllFeedbackController ");
    try{
        allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
    
}
// feedback status update
exports.updateFeedbackStatusController = async(req,res)=>{
    console.log("inside updateFeedbackStatusController");
    // get feedback id from url
    const {id} = req.params
    // get status of feedback from url query
    const status = req.query.status
    // update stattus of feedback with given id
    try{
        const exisitingFeedback = await testimonials.findById({_id:id})
        exisitingFeedback.status = status
        await exisitingFeedback.save()
        res.status(200).json(exisitingFeedback)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.getApprovedController = async(req,res)=>{
    console.log("inside getApprovedController");
    try{
        allApprovedFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)

    }catch(err){
        res.status(401).json(err)
    }

    
}
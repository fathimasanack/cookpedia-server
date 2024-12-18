const mongoose = require("mongoose")

const connectionString  = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("mongodb atlas successfully connected with cookpedia server");
    
}).catch(err=>{
    console.log("mongodb atlas connection failed");
    console.log(err);
    
    
})
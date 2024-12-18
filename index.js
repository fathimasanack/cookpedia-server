require('dotenv').config()
const express = require("express")
const cors = require("cors")
require("./config/connection")

const router = require('./routes/router')

const cookpediaServer = express()
cookpediaServer.use(cors())
cookpediaServer.use(express.json())
cookpediaServer.use(router)

const PORT = 3000 || process.env.PORT

cookpediaServer.listen(PORT,()=>{
    console.log(`cookpedia server started at port :${PORT} and waiting for client request`);
    
})

cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red"> cookpedia server started at port and waiting for client request </h1>`)
})
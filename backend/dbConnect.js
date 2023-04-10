const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})
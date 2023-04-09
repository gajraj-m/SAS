const mongoose = require('mongoose')

const URL =
  "mongodb+srv://dracula145:sasbygm@cluster0.llmlgcp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})
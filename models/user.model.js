const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    age:Number,
    phone:Number,
    role:String
})

module.exports= mongoose.model('user',userSchema)
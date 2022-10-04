const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content:String,
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
})

module.exports= mongoose.model('comment',commentSchema)
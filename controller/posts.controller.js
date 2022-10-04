
const postModel = require('../models/posts.model')

module.exports.addPost = async (req, res) => {
    const {title, content} = req.body
        await postModel.insertMany({title,content, createdBy:req.id})
            res.json({message:"Done"})
}


module.exports.updatePost = async (req, res) => {
    const {title, content,id} = req.body
    let post = await postModel.findOne({_id:id})
        if(post.createdBy == req.id){
            // console.log(post.createdBy,req.id);
                await postModel.updateOne({_id:id},{title:title,content:content})
                    res.json({message:"Done"})
        }else{
            res.json({message:"not valid"})
        }
}

module.exports.getallPosts = async (req, res) => {
        let posts = await postModel.find({}).populate("createdBy comments",'name email content createdBy ')
            res.json({message:"Posts",posts})

}

module.exports.userPosts = async (req, res) => {
    const createdBy = req.header('id')
        let posts = await postModel.find({createdBy:createdBy}).populate("createdBy comments",'name _id content ')
            res.json({message:"Posts",posts})

}



module.exports.deletePost = async (req, res) => {
    const {id} = req.body
    let post = await postModel.findOne({_id:id})
        if(post.createdBy == req.id){
            console.log(post.createdBy,req.id);
                await postModel.deleteOne({_id:id})
                    res.json({message:"Done"})
        }else{
            // console.log(post.createdBy,req.id);
            
            res.json({message:"not valid"})
        }
}
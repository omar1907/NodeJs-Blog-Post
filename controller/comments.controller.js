const commentModel = require('../models/comments.model')
const postsModel = require('../models/posts.model')
const userModel = require('../models/user.model')

module.exports.addComment = async(req, res) => {
 
   /*  
    const {content,postId} = req.body
        if(req.body.postId){
                let comment = await commentModel.insertMany({content:content,createdBy:req.id})
                    await postsModel.updateOne({_id:postId},{$push:{comments:comment}})
                        res.json({message:"done",comment})
            }else{
                res.json({message:"post id required"})
            }
*/

    const {content,postId} = req.body
         let post = await postsModel.findById({_id:postId})
            if(post){
            let comment = await commentModel.insertMany({content:content,createdBy:req.id})
                await postsModel.updateOne({_id:postId},{$push:{comments:comment}})
                    res.json({message:"done",comment})
        }else{
            res.json({message:"No post to comment"})
        }
}


module.exports.updateComment = async (req, res) =>{
    
    const {postId,commId,content} = req.body
        let post = await postsModel.findById({_id:postId})
            // console.log(post.createdBy);
                if(post.createdBy == req.id){
                    await commentModel.findByIdAndUpdate({_id:commId},{content:content})
                        res.json({message:"Done"})
                }else{
                    res.json({message:"not valid"})
                }
    /*comment owner only can edit comment not post owner*/
    // const {commId,content} = req.body
    //     let comment = await commentModel.findById({_id:commId})
    //             if(comment.createdBy == req.id){
    //                 await commentModel.findByIdAndUpdate({_id:commId},{content:content})
    //                     res.json({message:"Done"})
    //             }else{
    //                 res.json({message:"not valid"})
    //             }
}





module.exports.deleteComment = async (req, res) => {
    const {commId, postId} = req.body
    let comment = await commentModel.findOne({_id:commId})
        let post = await postsModel.findOne({_id:postId})
            if(comment.createdBy.toString() == req.id || post.createdBy.toString() == req.id){
                 await commentModel.deleteOne({_id:commId})
                    await postsModel.updateOne({_id:postId},{$pull : {comments : commId}})
                        res.json({message:"Deleted Donee"})
            }else{
                res.json({message:"not valid.."})
            }
}


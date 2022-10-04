const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const postsModel = require('../models/posts.model')
const commentsModel = require('../models/comments.model')



module.exports.signUp= async (req, res) => {
    const {name, email, password, age, phone} = req.body
        let user = await userModel.findOne({email})
            if(user){
                res.json({message:"email already exist"})
            }else{
                await bcrypt.hash(password,Number(process.env.SALT), async (err, hash) => {
                    await userModel.insertMany({name, email, password:hash, age, phone})
                        res.json({message:'Register Done..'})
                })
            }
}

module.exports.signin = async (req, res) => {
    const {email,password} = req.body
        let user = await userModel.findOne({email})
            if(user){
                const match = await bcrypt.compare(password, user.password)
                    if(match){
                        let token = await jwt.sign({userId:user._id,name:user.name},process.env.JWT_TOKEN)
                            res.json({message:"Success",token})
                        }else{
                            res.json({message:"Password Incorrect"})
                        }
                }else{
                res.json({message:"Email Doesn't Exist"})
                }
}


module.exports.changePassword = async (req, res) => {
        const {newPass, renewPass, oldPass } = req.body
            let user = await userModel.findOne({_id:req.id})
                if(newPass != oldPass && newPass == renewPass) {
                    let match = await bcrypt.compare(oldPass, user.password)
                        if(match){
                            await bcrypt.hash(newPass,Number(process.env.SALT), async (err, hash) =>{
                                await userModel.findByIdAndUpdate({_id:req.id},{password:hash})
                                    res.json({message:"Change Password Done"})
                            })
                        }else{
                            res.json({message:"Password Incorrect"})
                        }
                }else{
                    res.json({message:"Enter valid password"})
                }
        }

module.exports.updateUser = async (req, res) => {
    const {name,email,age, phone} = req.body
    let user = await userModel.findOne({email})
        if(user){
            res.json({message:"Email is exist"})
        }else{
            await userModel.findByIdAndUpdate(req.id,{name:name,email:email,age:age,phone:phone})
                res.json({message:"Donee"})
        }
        

}

module.exports.deleteUser = async( req, res) => {
         await userModel.deleteOne({_id:req.id})
            await postsModel.deleteMany({createdBy:req.id})
                 await commentsModel.deleteMany({createdBy:req.id})
                    res.json({message:"Delelted Done.."})

}
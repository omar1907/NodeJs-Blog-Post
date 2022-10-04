const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.auth = (req, res, next) => {
    const token = req.header('token')
        jwt.verify(token,process.env.JWT_TOKEN,(err, decoded) => {
            if(err){
                res.json(err)
            }else{
                req.id = decoded.userId
                next();
            }
        })
}
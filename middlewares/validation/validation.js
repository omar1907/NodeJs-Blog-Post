const Joi = require('joi')
let methods = ['body','params']

let schema = {
    body:Joi.object({
        name:Joi.string().required().min(3).max(20),
        email:Joi.string().email().required(),
        password:Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        repassword:Joi.ref('password'),
        age:Joi.number().min(12).max(50).required(),
        phone:Joi.number().required()
    }),

    params:Joi.object({
        id:Joi.string().min(4).max(4)
    })
}

module.exports.userValid = (req, res, next) => {
    let errArray = []
       methods.map((key) => {
        let {error} = schema[key].validate(req[key], {abortEarly:false})
            if(error){
                error.details.map((msg) =>{
                    errArray.push(msg.message)
                })
            }
       })
          if(errArray.length >0) {
            res.json(errArray)
          }else{
            next()
          }
}
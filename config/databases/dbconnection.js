const mongoose = require('mongoose')
require('dotenv').config()

module.exports.dbConnection =() =>{
    mongoose.connect(process.env.CONNECT_TEXT).then(()=> {
    console.log('Db is Connected...');
    })
}
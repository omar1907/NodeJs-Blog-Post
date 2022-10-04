const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./config/databases/dbconnection')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(require('./api/user.routes'))
app.use(require('./api/posts.routes'))
app.use(require('./api/comments.routes'))



dbConnection()
app.use('*',(req, res) => {
    res.json({message:"Wrong path!!"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
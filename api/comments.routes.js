const { addComment, updateComment, deleteComment } = require('../controller/comments.controller')
const { auth } = require('../middlewares/authentication/auth')

const router = require('express').Router()


router.post('/api/v1/comment/addcomment',auth,addComment)
router.patch('/api/v1/comment/updatecomment',auth,updateComment)
router.delete('/api/v1/comment/deletecommt',auth,deleteComment)







module.exports = router
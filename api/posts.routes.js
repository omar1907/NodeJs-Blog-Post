const { addPost, updatePost, getallPosts, userPosts, deletePost } = require('../controller/posts.controller')
const { auth } = require('../middlewares/authentication/auth')

const router = require('express').Router()


router.post('/api/v1/posts/addpost',auth,addPost)
router.put('/api/v1/posts/updatepost',auth,updatePost)
router.get('/api/v1/posts',getallPosts)
router.post('/api/v1/posts/userposts',auth,userPosts)
router.delete('/api/v1/posts/deleteposts',auth,deletePost)







module.exports = router
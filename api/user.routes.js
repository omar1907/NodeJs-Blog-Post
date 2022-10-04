const { signUp, signin, updateUser, deleteUser, changePassword } = require('../controller/user.controller')
const { auth } = require('../middlewares/authentication/auth')
const { userValid } = require('../middlewares/validation/validation')

const router = require('express').Router()

router.post('/api/v1/user/signup',userValid,signUp)
router.post('/api/v1/user/signin',signin)
router.patch('/api/v1/user/changepassword',auth,changePassword)
router.put('/api/v1/user/updateuser',auth,updateUser)
router.delete('/api/v1/user/deleteuser',auth,deleteUser)


module.exports = router
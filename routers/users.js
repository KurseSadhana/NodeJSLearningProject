const express = require('express')
const router = express.Router()

const {
    allUsers,
    singleUser,
    updateUser,
    addUser,
    deleteUser
} = require('../controllers/users')


router.get('/users',allUsers)
router.get('/users/:userId',singleUser)
router.put('/users/:userId',updateUser)
router.post('/users',addUser)
router.delete('/users/:userId',deleteUser)


module.exports = router
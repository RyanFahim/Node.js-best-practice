const express = require('express')
const { validateUser } = require('./model')
const checkToken = require('../../middleware/authentication')
const { createUser, getAllUsers, getIndividualUser, updateUser, deleteUser, loginUser, upload, uploadFile } = require('./controller')
const router = express.Router();

router.post('/add', validateUser, createUser )
router.post('/login', loginUser)
router.post('/getAll',checkToken, getAllUsers)
router.post('/getIndividual', getIndividualUser)
router.post('/update', updateUser)
router.post('/delete', deleteUser)
router.post('/upload', checkToken, upload.single('image'), uploadFile)


module.exports = router
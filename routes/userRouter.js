const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loggedIn,
    updateUser,
    changePassword,
    forgotPassword
} = require('../controllers/userController');
const protect = require('../middleWare/authMiddleware');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getUser', protect, getUser);


router.get('/loggedIn', loggedIn);
router.patch('/update', protect, updateUser)
router.patch('/changePassword', protect, changePassword)
router.post("/forgotPassword", forgotPassword)

module.exports = router
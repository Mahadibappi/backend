const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loggedIn
} = require('../controllers/userController');
const protect = require('../middleWare/authMiddleware');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getUser', protect, getUser);
router.get('/loggedIn', loggedIn);

module.exports = router
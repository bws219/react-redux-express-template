const express = require('express');
const router = express.Router();
const { User, Post, Comment, Vote } = require('../models');
// YOUR API ROUTES HERE

router.post('/register', (req, res) => {

})

router.post('/login', (req, res) => {
    res.json({
        message: 'hello'
    });
})

module.exports = router;


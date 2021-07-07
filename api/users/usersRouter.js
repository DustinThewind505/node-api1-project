const express = require('express')

const Users = require('./usersModel')

const router = express.Router();


// =========== GET users ===========

router.get('/', (req, res) => {
    Users.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json({ message: "error", err })
        })
})


module.exports = router
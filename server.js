const express = require('express')





const server = express()


server.use(express.json())




server.get('/', (req, res) => {
    res.json({ message: "Server is connected." })
})

server.get('/greet', (req, res) => {
    res.send('Hello')
})



module.exports = server;
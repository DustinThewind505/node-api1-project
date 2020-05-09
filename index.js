const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

server.use(express.json());

const PORT = 420;

server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} ** \n`))
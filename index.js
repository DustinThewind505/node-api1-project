const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

let hikers = [
    {
        "id": shortid.generate(),
        "name": "Seven",
        "bio": "Not Tarzan's Wife, another Jane"
    },
    {
        "id": shortid.generate(),
        "name": "Chinaman",
        "bio": "Not Tarzan's Wife, another Jane"
    },
];

server.use(express.json());

//=======================================================================================
//CREATE
//=======================================================================================
server.post('/api/users', (req, res) => {
    const newHiker = req.body;
    const { name, bio } = req.body;

    if (!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (name || bio) {
        newHiker.id = shortid.generate();
        hikers.push(newHiker);
        res.status(201).json(newHiker);
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

//=======================================================================================
//READ
//=======================================================================================
server.get('/api/hikers', (req, res) => {
    res.status(200).json(hikers)
})

//=======================================================================================
//UPDATE - PATCH
//=======================================================================================
server.patch('/api/hikers/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let found = hikers.find(hiker => hiker.id === id);

    if(found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({"message": "hiker not found"})
    }
})

//=======================================================================================
//UPDATE - PUT
//=======================================================================================
server.put('/api/hikers/:id', (req,res) => {
    const { id } = req.params;
    const changes = req.body;

    let index = hikers.findIndex(hiker => hiker.id === id);

    if(index !== -1) {
        changes.id = shortid.generate();
        hikers[index] = changes;
        res.status(200).json(hikers[index]);
    } else {
        res.status(404).json({"messge": "hiker not found"});
    }
})

//=======================================================================================
//DELETE
//=======================================================================================
server.delete('/api/hikers/:id', (req, res) => {
    const { id } = req.params;

    const found = hikers.find(hiker => hiker.id ===id);

    if(found) {
        hikers = hikers.filter(hiker => hiker.id !== id);
        res.status(200).json(found)
    } else {
        res.status(404).json({"Message": "The user with the specified ID does not exist."})
    } 

    res.status(200).json({"Ello": "Poppet"})
})



const PORT = 420;

server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} ** \n`))
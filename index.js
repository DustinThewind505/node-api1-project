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


    // const newUser = req.body;
    // newUser.id = shortid.generate();
    // hikers.push(newUser);
    // res.status(201).json(newUser);

})

server.get('/api/hikers', (req, res) => {
    res.status(200).json(hikers)
})

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
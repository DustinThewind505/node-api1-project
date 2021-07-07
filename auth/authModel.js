const db = require('../data/dbConfig')


//=========== GET user by id ===========
function getUserById(id) {
    return db('users').where({ id }).select('id', 'username')
}

//=========== POST user ===========
function addUser(user) {
    return db('users').insert(user)
        .then(ids => {
            return getUserById(ids[0])
        })
}

// =========== GET user by username ===========
function findUsername(username) {
    return db('users').where({ username: username })
}

module.exports = {
    getUserById,
    addUser,
    findUsername
}
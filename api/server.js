const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const UsersRouter = require('./users/usersRouter')
const AuthRouter = require('../auth/authRouter')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const protected = require('../auth/restricted-middleware')


const server = express()


server.use(express.json())
server.use(helmet())
server.use(cors())

server.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, 
      },
      httpOnly: true, 
      resave: false,
      saveUninitialized: false,
      store: new knexSessionStore(
          {
              knex: require('../data/dbConfig'),
              tablename: "sessions",
              sidfieldname: "sid",
              createtable: true,
              clearInterval: 3600 * 1000
          }
      )
    })
  );

server.use('/api', AuthRouter)
server.use('/api/users', protected ,UsersRouter)

// =========== 404 fallback ===========
server.use('/', (req, res) => {
  res.status(404).send('<div style="padding:15% 0 5%;background-color:black;display: flex;flex-direction: column;align-items:center;"><h1 style="color:lawngreen;font-size:46px;">404 could not find page</h1><img src="http://3.bp.blogspot.com/-nY7RCflMJOk/TdVR-JHjEyI/AAAAAAAAAC8/D0tVTHeksow/s1600/Powerman_5000_umvd01.jpg"/></div>');
});


module.exports = server;

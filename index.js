const server = require('./api/server')

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`\n\t\t\t\t\t*** Server is running on localhost:${PORT}/ ***\n`)
})
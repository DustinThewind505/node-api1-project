const server = require('./api/server')

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
    console.log(`\n\t\t\t\t\t*** Server is running on localhost:${PORT}/ ***\n`)
})
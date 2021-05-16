require("dotenv").config()
const express = require('express')

const app = express()

const serverPort = process.env.SERVER_PORT || 8080

app.listen(serverPort, () => {
    console.log(`server is running on http://localhost:${serverPort}`)
})

app.get('/', (req, res) => res.send('<h1>Hello express!</h1>'))
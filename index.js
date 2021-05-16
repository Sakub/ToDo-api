require("dotenv").config()
const express = require('express')
const db = require('./db')

const app = express()
const serverPort = process.env.SERVER_PORT || 3000

app.use(express.json())

app.listen(serverPort, () => {
    console.log(`server is running on http://localhost:${serverPort}`)
})

app.get('/', async (req, res) => {
    try {
        let results = await db.getToDos()
        res.json(results)
    } catch(e) {
        res.send(e)
    }
})
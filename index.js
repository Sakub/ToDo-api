require("dotenv").config()
const express = require('express')
const db = require('./db')
const cors = require("cors")

const app = express()
const serverPort = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded())

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


app.post('/', async (req, res) => {
    if (!req.body.name) res.send('Field name cant be empty!')
    try {
        let result = await db.createToDo(req.body.name)
        getNewToDo(result.insertId).then(todo => {
            res.json(todo)
        })
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    } 
})

async function getNewToDo(id) {
    try {
        let newToDo = await db.getToDo(id)
        return newToDo
    } catch (e) {
        return console.log(`error at getting freshly added todo, ${e}`)
    }
}
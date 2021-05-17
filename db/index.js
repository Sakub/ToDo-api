require("dotenv").config()
const mysql = require('mysql')

const pool = mysql.createPool({
    database: process.env.DB_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST
})
let userDb = {}

userDb.getToDos = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM todos', (err, results) => {
            if (err) return reject(`error: ${err}`)
            
            return resolve(results)
        })
    })
}

userDb.createToDo = name => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO todos (name) VALUES ("${name}")`, (err, result) => {
            if (err) return reject(`error: ${err}`)

            return resolve(result)
        })
    })
}
userDb.getToDo = id => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM todos WHERE id = ${id}`, (err, result) => {
            if(err) return reject(`error: ${err}`)

            return resolve(result)
        })
    })
}
module.exports = userDb
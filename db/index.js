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
    return new Promise((reject, resolve) => {
        pool.query('SELECT * FROM todos', (err, results) => {
            if (err) return reject(`error: ${err}`)
            else return resolve(results)
        })
    })
}

module.exports = userDb
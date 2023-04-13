const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'word'
});

const app = express();

app.get("/students", (req, res) => {
    connection.connect();
    connection.query('SELECT * from students', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
    connection.end();
})

app.get("/", (req, res) => {
    res.send("index");
})
app.listen('4000', () => { console.log("app server 열림") });
const express = require('express');
const mysql = require('mysql2');
var bodyParser = require('body-parser')
const ejs = require("ejs");
const path = require('path');
const cors = require('cors');

// mysql과 같은 네트워크 망 안에 있지만 172.19.0.2:3306으로 접근해야 함
const connection = mysql.createConnection({
    host: '172.19.0.2',
    user: 'root',
    password: 'password',
    database: 'word',
    port:'3306'   
});

const app = express();
connection.connect();

// cors all allow
app.use(cors())

// node와 프론트가 json으로 통신하도록 셋팅
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// node서버에서 html을 라우팅 하기위한 view engine설정
app.set('views',path.join(__dirname,'ejs'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

// students 테이블 : id, name, age, number, ban_num
// 학생 테이블 조회 API
app.get("/students", (req, res) => {
    connection.query('SELECT * from students', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    })
})

// 학생 추가 API
app.post("/students/add", (req, res) => {
    var insetion = `INSERT INTO students(name, age, number, ban_num) VALUES(?,?,?,?)`
    var values = [req.body.name,req.body.age,req.body.number,req.body.ban_num]

    connection.query(insetion, values, (error, result) => {
        if(error) throw error;
        res.send("학생 추가 성공")
    })
})

// 학생 삭제 API
app.post("/students/delete", (req, res) => {
    var deletion = `DELETE FROM students WHERE stu_id = ?`
    var values = [req.body.stu_id]

    connection.query(deletion, values, (error, result) => {
        if(error) throw error;
        res.send("학생 삭제 성공")
    })
})

// 학생 업데이트 API
app.put("/students/update", (req, res) => {
    console.log("업데이트 요청옴 ", req.body)
    var updation = `UPDATE students SET name = ?, age = ?, number = ?, ban_num = ? WHERE stu_id = ?`
    var values = [req.body.name, req.body.age, req.body.number, req.body.ban_num ,req.body.stu_id]

    connection.query(updation, values, (error, rows, fields) => {
        if(error) throw error;
        res.send("학생 변경 성공")
    })
})

// 마이에스큐엘과의 연결을 끊기 위한 API
app.get("/end_mysql", (req, res) => {
    connection.end();
    res.send("mysql connection end");
})

// 페이지 라우팅
//------------------------------------------
app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname + "/src/main.html"))
})
app.get("/add", function(req, res, next) {
    res.sendFile(path.join(__dirname +"/src/add.html"))
})
app.get("/delete", function(req, res, next) {
    res.sendFile(path.join(__dirname +"/src/del.html"))
})
app.get("/update", function(req, res, next) {
    res.sendFile(path.join(__dirname +("/src/update.html")))
})

// 서버 실행 4006포트로
app.listen('4006', () => { console.log("app server 열림") });
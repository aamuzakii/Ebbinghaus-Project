const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({ extended: false}));


const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "password",
    database: "brainhackdb"
})


db.connect((err) => {
    if(err) {
        throw err};
    console.log("DB connected")
})


app.get('/createreviewtable', (req, res) => {
    let sql = 'CREATE TABLE reviewtable (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), reviewdate VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created")
    })
})

app.get('/reviewlist', (req, res) =>{
    let sql = 'SELECT * FROM reviewtable'
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        res.send("data fetched");
        hasil = res.body
        console.log(result);
    })
})



app.post("/addlist",(req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const reviewdate = req.body.reviewdate;
    var combinedObj = {title, body, reviewdate};

    let sql = 'INSERT INTO reviewtable SET ?'
    let query = db.query(sql, combinedObj, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send("data inserted")
    })


    try {
        console.log(car);        
    } catch (error) {
        console.log(error)
    }

});



app.listen('3000', () => {
    console.log("server is running coy")
})
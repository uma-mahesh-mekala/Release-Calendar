const express = require('express');
const app = express();
const upload = require('./store');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const db=require('./db')
const path = require('path');
const { error } = require('console');
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = 3000;


app.listen(port, () => { 
    console.log(`server stared at ${port}`);
})
app.get("/", (req, res)=>{ 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.post("/submit-form", upload.single('image'), (req, res, next) => {
    delete req.body.submit;
    req.body.image = req.file.path;
    var file = req.file;
    if (!file)
    {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    // var artistName = req.body.artistName;
    // var songTitle = req.body.songTitle;
    // var date = (req.body.date).split('-').reverse().join('-');
    // var genre = req.body.genre;
    // var url = req.body.url;
    // var recordLabel = req.body.recordLabel;
    var postData = req.body;
    db.insertFormData(postData, (err, result) => {
        if (err) {
            res.status(500).send({ error: "An error occured while inserting the data" });
            return;
        }
        res.send({ success: "data inserted successfully", insertId: result.insertID });
    });
});

app.get('/all-data', (req, res) => {
    db.getAllSongs((err, results) => {
        if (err)
        {
            res.send({ error: "an error occured while retrieving data" });
            throw err;
        }
        res.json(results);
    })
    
})
    
    
function fetchData() {
    fetch("http://localhost:3000/all-data")
    .then(response => response.json())
    .then(data => console.log(data))
    .then((err) => { console.log('error:', err)})
 }



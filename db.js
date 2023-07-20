const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:'releases_db'
})
connection.connect((err) => { 
    if (err) throw err;
    console.log("connection is established");
})

function insertFormData(data, callback)
{
    var query = "INSERT INTO releases SET ?";
    connection.query(query, data, callback);
}

function getAllSongs(callback) { 
    connection.query('SELECT * from releases', function (err, results) {
        if (err) {
            callback(err);
        }
        callback(null, results)
    });
}
module.exports = { insertFormData,connection, getAllSongs  };

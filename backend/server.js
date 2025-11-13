const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Empty password
    database: 'ipetlk_users'
//   host: "localhost",
//   user: "root",
//   password: " " ,
//   database: "ipet",
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0,
});

app.get("/", (req, res) => {
    return res.json("API is running...");
});

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});  

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
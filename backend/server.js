const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// MySQL Connection
const db = mysql.createConnection({
    host: 'maglev.proxy.rlwy.net',
    port:26312,
    user: 'root',
    password: 'clLUleCpsPVdUrmsTJDQPFqXEScqQLzy', // change this
    database: 'railway'
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// Priority logic
const priority = {
    Business: 3,
    Priority: 2,
    Economy: 1
};


// ➕ Add Passenger
app.post('/add', (req, res) => {
    const { name, flight, type } = req.body;

    const sql = "INSERT INTO passengers_queue (name, flight, type) VALUES (?, ?, ?)";
    db.query(sql, [name, flight, type], (err) => {
        if (err) return res.send(err);
        res.send("Passenger Added");
    });
});


// 📥 Get Queue (Sorted)
app.get('/passengers', (req, res) => {
    db.query("SELECT * FROM passengers_queue", (err, results) => {
        if (err) return res.send(err);

        results.sort((a, b) => priority[b.type] - priority[a.type]);
        res.json(results);
    });
});


// ❌ Serve Passenger
app.delete('/serve', (req, res) => {
    db.query("SELECT * FROM passengers_queue", (err, results) => {
        if (err) return res.send(err);

        if (results.length === 0) {
            return res.send("No passengers");
        }

        results.sort((a, b) => priority[b.type] - priority[a.type]);
        const next = results[0];

        db.query("DELETE FROM passengers_queue WHERE id=?", [next.id]);

        db.query(
            "INSERT INTO checked_passengers (name, flight, type) VALUES (?, ?, ?)",
            [next.name, next.flight, next.type]
        );

        res.send("Checked-in Done");
    });
});


// 📊 History
app.get('/history', (req, res) => {
    db.query("SELECT * FROM checked_passengers ORDER BY checked_at DESC", (err, results) => {
        if (err) return res.send(err);
        res.json(results);
    });
});


// 🚀 Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});
module.exports = db;
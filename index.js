const express = require('express');
const app = express();
const conn = require('./models/db.model');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send("<h1>Hello from server</h1>");
});


app.post('/emp', (req, res) => {
    const { name, email, position } = req.body;
    const sql = 'INSERT INTO emp (name, email, position) VALUES (?, ?, ?)';
    conn.query(sql, [name, email, position], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Employee added successfully', id: result.insertId });
    });
    console.log("Executed Query:", sql, [name, email, position]);
});
app.get('/emp',(req,res)=>{
    const sql = 'SELECT * FROM emp';
    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
})


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

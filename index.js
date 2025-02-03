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

//send data from user from database 
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
//fetch data from database
app.get('/emp',(req,res)=>{
    const sql = 'SELECT * FROM emp';
    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
})
// update databasee 
app.put('/emp/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, position } = req.body;

    const sql = 'UPDATE emp SET name = ?, email = ?, position = ? WHERE id = ?';
    conn.query(sql, [name, email, position, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});
//delete
app.delete('/emp/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM emp WHERE id = ?';
    conn.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

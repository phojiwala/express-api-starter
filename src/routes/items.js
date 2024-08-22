const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_demo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO items (name) VALUES (?)';
  connection.query(query, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM items';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  const query = 'UPDATE items SET name = ? WHERE id = ?';
  connection.query(query, [name, req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ id: parseInt(req.params.id), name });
  });
});

router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(204).send();
  });
});

module.exports = router;
const express = require('express');
const axios = require('axios');
const db = require('../db/db');
const router = express.Router();

router.get('/universities', async (req, res) => {
  try {
    const response = await axios.get('http://universities.hipolabs.com/search?country=India');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching universities');
  }
});

router.post('/favourites', (req, res) => {
  const { name, state_province, web_pages } = req.body;
  const sql = 'INSERT INTO favourites (name, state_province, web_pages) VALUES (?, ?, ?)';
  db.query(sql, [name, state_province, web_pages], (err, result) => {
    if (err) throw err;
    res.status(201).send('Favourite added');
  });
});

router.get('/favourites', (req, res) => {
  const sql = 'SELECT * FROM favourites';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;

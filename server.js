const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Su2211raj',
  database: 'university_search',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  } else {
    console.log('Connected to database');
  }
});

app.get('/api/universities', async (req, res) => {
    const { name, country, limit, offset } = req.query;
  
    let apiUrl = 'http://universities.hipolabs.com/search';
    let params = {};
  
    if (name) params.name = name;
    if (country) params.country = country;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
  
    try {
      const response = await axios.get(apiUrl, { params });
      res.json(response.data);
      console.log("response");
    } catch (error) {
      console.error('Error fetching universities:', error);
      res.status(500).send('Error fetching universities');
    }
  });
  

  app.post('/api/favourites', (req, res) => {
    const { name, state_province, web_pages } = req.body;
    const sql = 'INSERT INTO favourites (name, state_province, web_pages) VALUES (?, ?, ?)';
    db.query(sql, [name, state_province, web_pages], (err, result) => {
      if (err) {
        console.error('Error adding favourite:', err);
        res.status(500).send('Error adding favourite');
      } else {
        res.status(201).send('Favourite added');
      }
    });
  });

  app.get('/api/favourites', (req, res) => {
    const sql = 'SELECT * FROM favourites';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching favourites:', err);
        res.status(500).send('Error fetching favourites');
      } else {
        res.json(results);
      }
    });
  });

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

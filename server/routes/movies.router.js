const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get movies data, from movies table 

router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "movies"`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
  })

module.exports = router;
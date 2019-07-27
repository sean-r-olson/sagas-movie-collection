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

  router.get('/:id', (req, res) => {
    let movieId = req.params.id;
    const sqlText =`select genres.name, movies.title, movies.description, movies.poster from movies_genres
                  join genres on genres.id = movies_genres.genre_id
                  join movies on movies.id = movies_genres.movie_id
                  where movie_id = $1`;
    const values = [movieId];
    console.log(movieId);
    pool.query(sqlText, values)
      .then( (response) => {
        res.send(response.rows[0]);
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log(`Error getting movies`, error);
        res.sendStatus(500);
      })
  })

module.exports = router;

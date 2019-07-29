const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get movies data, from movies table 
router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "movies" ORDER BY "id"`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

  // GET to db, select only id of selected movie 
  router.get('/:id', (req, res) => {
    let movieId = req.params.id;
    const sqlText =`select movie_id, genres.name, movies.title, movies.description, movies.poster from movies_genres
                    join genres on genres.id = movies_genres.genre_id
                    join movies on movies.id = movies_genres.movie_id
                    where movie_id = $1;`;
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

  // PUT to db, update only selected movie title, description
  router.put('/update/:id', (req, res) => {
    console.log(req.body);
    const sqlText =`update movies set description = $1, title=$2 where id = $3;`;
    const values = [ req.body.description, req.body.title, req.body.movie_id ];
    pool.query(sqlText, values)
      .then( (response) => {
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log(`Error getting movies`, error);
        res.sendStatus(500);
      })
  })


module.exports = router;

const express = require('express')
const router = express.Router();

const movieController = require('../Controller/MovieController')

router.get('/movie', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.post('/movie',movieController.createMovie);
router.put('/movie/:id', movieController.updateMovie);
router.delete('/movie/:id',movieController.deleteMovie);

module.exports= movieRouter;

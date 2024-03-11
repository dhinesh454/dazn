const express = require('express');
const routes = express.Router();

const movieController = require('../controller/movie');
const middlewareAuthenticate = require('../middleware/authentication');


routes.post('/movies',middlewareAuthenticate.authentication,middlewareAuthenticate.isAdmin,movieController.addNewMovie);
routes.get('/movies',middlewareAuthenticate.authentication,movieController.getMovies);
routes.delete('/movies/:id',middlewareAuthenticate.authentication,middlewareAuthenticate.isAdmin,movieController.deleteMovie);
routes.get('/search',middlewareAuthenticate.authentication,movieController.searchMovies)
routes.put('/movies/:id',middlewareAuthenticate.authentication,middlewareAuthenticate.isAdmin,movieController.updateMovie)


// routes.post('/movies',middlewareAuthenticate.authentication,movieController.addNewMovie);
// routes.get('/movies',middlewareAuthenticate.authentication,movieController.getMovies);
// routes.delete('/movies/:id',middlewareAuthenticate.authentication,movieController.deleteMovie);
// routes.get('/search',middlewareAuthenticate.authentication,movieController.searchMovies);
// routes.put('/movies/:id',middlewareAuthenticate.authentication,movieController.updateMovie)

module.exports=routes;
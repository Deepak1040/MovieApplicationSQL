const Movie = require('../Models/Movie')

exports.createMovie = async (req, res) => {
    try {
        const createdMovie = await Movie.createMovie(req.body);
        if (createdMovie.affectedRows < 0) {
            res.send(400).json({
                success: false,
                message: "Movie Not Created"
            })
        }

        res.send(201).json({
            success: true,
            message: "User created Successfully",
            data: createdMovie[0]
        })

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error
        })
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        const movieList = await Movie.getAllMovies();
        if (movieList === null) {
            res.send(400).json({
                success: false,
                error: "Error fetching Movies"
            });
        }

        res.send(200).json({
            success: true,
            message: "List of All Movies",
            data: movieList[0]
        });

    } catch (error) {
        res.send(400).json({
            success: false,
            error: error
        });
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (movie === null) {
            res.send(400).json({
                success: false,
                message: `Movie not found with id ${req.params.id}`
            })
        }

        res.send(200).json({
            success: true,
            message: "Movie found!!",
            data: movie[0]
        })

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error
        })
    }
}

exports.updateMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.updateMovie(req.body, id);
        if (movie === null) {
            res.send(400).json({
                success: false,
                message: "Movie Did not update!!"
            });
        }

        res.send(200).json({
            success: true,
            message: "Movie Updated!!!",
            data: movie[0]
        })

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error
        });
    }
}

exports.deleteMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await Movie.deleteMovie(id);
        if (movie.affectedRows < 0) {
            res.send(400).json({
                success: false,
                message: "Movie Not Deleted"
            });
        }

        res.send(200).json({
            success: true,
            message: "Movie Deleted Successfully!!!"
        });

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error
        })
    }
}


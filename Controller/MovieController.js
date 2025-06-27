const Movie = require('../Models/Movie')

exports.createMovie = async (req, res) => {
    try {
        const createdMovie = await Movie.createMovie(req.body);
        if (createdMovie.affectedRows < 0) {
            res.status(400).json({
                success: false,
                message: "Movie Not Created"
            })
        }

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: createdMovie[0]
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        const movieList = await Movie.getAllMovies();
        if (movieList === null) {
            res.status(400).json({
                success: false,
                error: "Error fetching Movies"
            });
        }

        res.status(200).json({
            success: true,
            message: "List of All Movies",
            data: movieList[0]
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (movie === null) {
            res.status(400).json({
                success: false,
                message: `Movie not found with id ${req.params.id}`
            })
        }

        res.status(200).json({
            success: true,
            message: "Movie found!!",
            data: movie[0]
        })

    } catch (error) {
        res.status(400).json({
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
            res.status(400).json({
                success: false,
                message: "Movie Did not update!!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie Updated!!!",
            data: movie[0]
        })

    } catch (error) {
        res.status(400).json({
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
            res.status(400).json({
                success: false,
                message: "Movie Not Deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie Deleted Successfully!!!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}


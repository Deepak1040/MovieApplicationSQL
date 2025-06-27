const db = require('../Config/db')

createMovie = async (movie) => {
    const { name, length, actors, screen } = movie;

    console.log(movie);
    if (!movie) {
        return {
            error: "All Movie Fiels are Required"
        }
    }
    try {
        const query = `INSERT INTO movies(name,length,actors,screen) VALUES (?,?,?,?)`;
        const values = [name, length, actors, screen];

        const result = await db.query(query, values);
        return result;
    } catch (err) {
        return { error: err };
    }
}

getAllMovies = async () => {
    try {
        const query = `select * from movies`;
        const result = await db.query(query);
        return result;
    } catch (error) {
        return error;
    }

}

getMovieById = async (id) => {

    try {
        const id = id;
        const query = `select * from movies where id =?`;
        const result = await db.query(query, [id]);
        return result;
    } catch (error) {
        return error;
    }

}

updateMovie = async (movie, id) => {
    const { name, length, actors, screen } = movie;
    const id = id;
    try {
        const query = `UPDATE movies SET name =?, length=?, actors=?, screen=?`;
        const result = db.query(query, [name, length, actors, screen]);
        return result;
    } catch (error) {
        return error;
    }

}


deleteMovie = async (id) => {

    const id = id;
    try {
        const query = `DELETE FROM movies where id =?`;
        const result = db.query(query, [id]);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = movie;
const db = require('../Config/db.js');

createUser = async (body) => {

    const name = body.name;
    const email = body.email;
    const password = body.password;
    const mobile = body.mobile;

    console.log('Received data:', body);
    // Validate required fields
    if (!name || !email || !mobile || !password) {
        return { error: 'All fields are required' };
    }

    // SQL query
    const query = 'INSERT INTO users (name, email, mobile , password) VALUES (?, ?, ?, ?)';
    const values = [name, email, mobile, password];

    // Execute query
    const result = await db.query(query, values);

    return result[0];
}


getUserByName = async (body) => {
    const name = body.name;
    const query = 'SELECT * FROM users WHERE name = ?';
    const result = await db.query(query, [name]);
    return result[0];
}

getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const result = await db.query(query);
    return result[0] || [];
}


updateUser = async (body) => {
    const getUserByName = body.name;
    const { name, email, password, mobile } = body;

    if (!name || !email || !password || !mobile) {
        return { error: 'All fields are required' };
    }

    const query = 'UPDATE users SET name = ?, email = ?, password = ?, mobile = ? WHERE name = ?';
    const result = await db.query(query, [name, email, password, mobile, getUserByName]);

    return result[0];
}

deleteUser = async (body) => {
    const getUserByName = body.name;
    const query = 'DELETE FROM users WHERE name = ?';
    const result = await db.query(query, [getUserByName]);
    return result[0];
}

module.exports = {
    createUser: exports.createUser,
    getUserByName: exports.getUserByName,
    getAllUsers: exports.getAllUsers,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser
};
// Exporting the function to get all users
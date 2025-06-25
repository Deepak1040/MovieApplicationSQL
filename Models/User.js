const db = require('../db.js');
// Make sure in your main app file (e.g., app.js or server.js) you have:


exports.createUser = (body) => {

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
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return { error: 'Database error' };
        } else {
            return results;
        }
    });
};


exports.getUserByName = (req, res) => {
    const name = req.params.name;
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
}

exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
}

exports.updateUser = (req, res) => {
    const getUserByName = req.params.name;
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'UPDATE users SET name = ?, email = ?, password = ?, mobile = ? WHERE name = ?';
    db.query(query, [name, email, password, mobile, getUserByName], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    });
}

exports.deleteUser = (req, res) => {
    const getUserByName = req.params.name;
    const query = 'DELETE FROM users WHERE name = ?';
    db.query(query, [getUserByName], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
}
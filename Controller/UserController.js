const User = require('../Models/User.js');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.getUserByName(req.params.name);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser =  (req, res) => {
    try {

        const user =  User.createUser(req.body);
        console.log(user);
        res.status(201).json({ data: user, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = req.body;
        await User.updateUser(req.params.id, user);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteUser(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

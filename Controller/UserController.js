const User = require('../Models/User.js');

exports.getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        console.log(users);
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await getUserByName(req.params.name);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user,
            message: 'User fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ data: user, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = req.body;
        await updateUser(req.params.id, user);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await deleteUser(req.params.name);
        res.json({ message: 'User deleted', data: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

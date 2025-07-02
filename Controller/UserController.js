const { StatusCodes } = require('http-status-codes');
const User = require('../Models/User');
const UserService = require('../Service/UserService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    const user = req.body;
    let result = await UserService.createUser(user);
    if (result !== "") {
        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                id: result.id,
                username: result.username,
                email: result.email,
                role: result.role,
                password: res.password
            }
        })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "User not created"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_SECRET_EXPIRY }
        );

        res.status(StatusCodes.OK).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        if (users === null) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "Users not Found"
            });
        } else {

            const singleUser = users.map(user => ({
                username: user.username,
                email: user.email,
                role: user.role
            }));

            res.status(StatusCodes.OK).json({
                success: true,
                message: "All User found",
                data: singleUser
            });
        }

    } catch (err) {
        console.error(err);
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getById(userId);
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "User not Found"
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User found",
            data: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User Details is empty"
            })
        }
        const updatedUser = await UserService.updateUser(userId, user);
        console.log(updatedUser)
        if (updatedUser === null) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "User not Found"
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Updated"
        });
    } catch (error) {
        console.error(error);
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    const result = await UserService.deleteUser(id);

    if (result === "success") {
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Deleted"
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: result
        });
    }
}


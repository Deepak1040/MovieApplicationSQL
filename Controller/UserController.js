const { StatusCodes } = require('http-status-codes');
const User = require('../Models/User');
const UserService = require('../Service/UserService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../Models/Role');

exports.createUser = async (req, res) => {
    const user = req.body;

    const result = await UserService.createUser(user);

    if (result !== "") {
        // Include role name from associated Role model
        const role = await Role.findByPk(result.roleId);

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                id: result.id,
                username: result.username,
                email: result.email,
                role: role?.name || 'N/A' // show role name, not roleId
            }
        });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "User not created"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: {
                model: Role,
                attributes: ['name']
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.Role.name
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_SECRET_EXPIRY }
        );

        res.status(StatusCodes.OK).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.Role.name
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
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User Details is empty"
            })
        }
        const updatedUser = await UserService.updateUser(userId, user);
        console.log(updatedUser)
        if (updatedUser === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "User not Found"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User Updated"
        });
    } catch (error) {
        console.error(error);
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    // Check if the logged-in user is Admin
    if (req.user?.role !== 'Admin') {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            error: "Access denied. Only Admins can delete users.",
        });
    }

    const result = await UserService.deleteUser(id);

    if (result === "success") {
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Deleted",
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: result,
        });
    }
};

// TODO CREATE LOGOUT CONTROLLER

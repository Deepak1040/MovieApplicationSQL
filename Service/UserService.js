const User = require('../Models/User')
const bcrypt = require('bcryptjs');

exports.createUser = async (body) => {
    const user = body;
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const result = await User.create(user);
        return result;
    } catch (error) {
        console.error(error);
        return "";
    }
}

exports.getUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error(error);
        return null;
    }
}

exports.getById = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

exports.updateUser = async (userId, user) => {
    try {
        const id = userId;
        const updateData = user;
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            updateData.password = hashedPassword;
        }
        const updatedUser = await User.update(updateData, { where: { id: id } });
        return updatedUser;
    } catch (error) {
        console.error(error);
        return null;
    }

}


exports.deleteUser = async (userId) => {
    const rows = await User.destroy({ where: { id: userId } })
    if (rows === 0) {
        return "User not found!!!";
    } else {
        return "success";
    }
}
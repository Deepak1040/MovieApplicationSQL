const User = require('../Models/User')
const bcrypt = require('bcryptjs');
const Role = require('../Models/Role');

exports.createUser = async (body) => {
    const user = body;

    try {

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const roleName = user.role || 'User';
        const role = await Role.findOne({ where: { name: roleName } });

        if (!role) throw new Error(`Role '${roleName}' not found`);

        user.roleId = role.id;
        delete user.role;

        const result = await User.create(user);
        return result;

    } catch (error) {
        console.error('Create User Error:', error);
        return "";
    }
};




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

exports.updateUser = async (userId, updateData) => {
    try {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        if (updateData.roleName ) {
            const role = await Role.findOne({ where: { name: updateData.roleName } });
            if (!role) {
                throw new Error('Invalid role');
            }
            updateData.roleId = role.id;
            delete updateData.roleName;
        }

        const [rowsUpdated] = await User.update(updateData, { where: { id: userId } });

        if (rowsUpdated === 0) {
            console.warn('No user updated. Possibly wrong userId.');
            return null;
        }

        const updatedUser = await User.findByPk(userId);
        return updatedUser;
    } catch (error) {
        console.error('Update User Error:', error);
        return null;
    }
};



exports.deleteUser = async (userId) => {
    const rows = await User.destroy({ where: { id: userId } })
    if (rows === 0) {
        return "User not found!!!";
    } else {
        return "success";
    }
}
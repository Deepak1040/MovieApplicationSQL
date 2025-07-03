const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());

// DB Config & Models
const sequelize = require('./Config/db');
const Role = require('./Models/Role');
const User = require('./Models/User');

// 🔗 Associations (must come before sync)
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// 🪵 Logging with IST format
morgan.token('date', () => {
    const date = new Date();
    const formatted = date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return formatted.replace(/(am|pm)/, (match) => match.toUpperCase()) + ' IST';
});
app.use(morgan(`:remote-addr [:date] ":method :url" :status - :response-time ms`));

// 🌱 Seeder: Add default roles
const seedRole = async () => {
    const defaultRoles = ['Admin', 'Manager', 'User'];
    for (const name of defaultRoles) {
        await Role.findOrCreate({ where: { name } });
    }
};

// 🔄 Sync & Seed
(async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true });

        await seedRole();

    } catch (error) {
        console.error('❌ Unable to connect or sync to the database:', error);
    }
})();

// Routes
const userRouter = require('./Routes/User');
app.use('/api/users', userRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});

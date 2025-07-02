const express = require('express')
const app = express();
app.use(express.json());
const morgan = require('morgan')

app.use(morgan(`:remote-addr [:date] " :method :url " :status - :response-time ms`));


require('dotenv').config();
const sequelize = require('./Config/db.js');
const User = require('./Models/User.js');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ alter: true }); // or { force: true } to drop & recreate

        console.log('User table synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


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

    const capitalized = formatted.replace(/(am|pm)/, (match) => match.toUpperCase());
    return `${capitalized} IST`;
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server started on http://localhost:${process.env.PORT}`);
})

const userRouter = require('./Routes/User.js');

app.use('/api/users', userRouter);
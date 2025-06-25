const express = require('express')
const app = express();
app.use(express.json());
const morgan = require('morgan')

app.use(morgan(`:remote-addr [:date] " :method :url " :status - :response-time ms`));


require('dotenv').config();
require('./db')

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

app.use('/api/users', require('./Routes/User.js'));
const express = require('express')
const app = express();

const morgan = require('morgan')
app.use(express.json());
app.use(morgan(`:remote-addr [:date] ":method :url" :status - :response-time ms`));
require('dotenv').config();


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
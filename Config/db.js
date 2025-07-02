// const mysql = require('mysql2');

// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// }).promise();

// connection.connect((err) => {
//     if (err) return console.error(err.message);

//     console.log('Connected to the MySQL server.');
// });

// process.on('SIGINT', () => {
//     console.log('\n🛑 Closing MySQL connection (SIGINT)...');
//     connection.end((err) => {
//         if (err) {
//             console.error('❌ Error during MySQL disconnection:', err.stack);
//         } else {
//             console.log('✅ MySQL connection closed.');
//         }
//         process.exit();
//     });
// });

// process.on('SIGTERM', () => {
//     console.log('\n🛑 Closing MySQL connection (SIGTERM)...');
//     connection.end(() => process.exit());
// });

// module.exports = connection;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // database file
  logging: false
});

module.exports = sequelize;

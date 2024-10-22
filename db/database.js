// db/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'expense_tracker.db'), (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create transactions table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
            category TEXT NOT NULL,
            amount REAL NOT NULL CHECK(amount >= 0),
            date TEXT NOT NULL,
            description TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating transactions table:', err.message);
        } else {
            console.log('Transactions table ready.');
        }
    });
});

module.exports = db;



// {
//     "name": "expense-tracker",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "body-parser": "^1.20.3",
//       "express": "^4.21.1",
//       "sqlite3": "^5.1.7"
//     },
//     "devDependencies": {
//       "nodemon": "^3.1.7"
//     }
//   }
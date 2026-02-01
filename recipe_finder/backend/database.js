const sqlite3 = require('sqlite3').verbose();

// Create / open database file app.db in backend folder
const db = new sqlite3.Database('./app.db', (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  // Users table for login/signup
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Favorites table for saved recipes
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipe_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      image TEXT,
      UNIQUE(user_id, recipe_id)
    )
  `);
});

module.exports = db;

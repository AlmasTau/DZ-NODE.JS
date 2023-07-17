const sqlite3 = require('sqlite3').verbose();

class DataStorage {
  constructor(database) {
    this.db = new sqlite3.Database(database.file, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the database.');
        this.createTables();
      }
    });
  }

  createTables() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT,
        passw TEXT,
        email TEXT
      )
    `;

    this.db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Users table created.');
      }
    });
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT login, email FROM users WHERE id = ?';

      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(`${row.login}, ${row.email}`);
        }
      });
    });
  }

  addUser(login, passw, email) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (login, passw, email) VALUES (?, ?, ?)';

      this.db.run(sql, [login, passw, email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  loginUser(login, passw) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id FROM users WHERE login = ? AND passw = ?';

      this.db.get(sql, [login, passw], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row.id : null);
        }
      });
    });
  }
}

module.exports = DataStorage;

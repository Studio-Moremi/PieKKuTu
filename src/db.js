const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db', (err) => {
  if (err) {
    console.error('DB 연결 실패:', err.message);
  } else {
    console.log('SQLite3 데이터베이스 연결 성공');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT UNIQUE,
      username TEXT,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
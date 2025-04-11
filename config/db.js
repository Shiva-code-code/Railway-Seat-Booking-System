const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
console.log('Connecting to DB at:', process.env.DATABASE_URL);

module.exports = pool;


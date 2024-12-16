const { Pool } = require('pg');

const pool = new Pool();

const testDB = async () => {
    const result = await pool.query('SELECT NOW()');
    console.log(result.rows[0].now, ': Database connected');
};

testDB();

module.exports = pool;

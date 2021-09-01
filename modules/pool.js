var Pool = require('pg').Pool;


const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  sslmode: 'require'
};

var ourPool = new Pool(config);

module.exports = ourPool;

  
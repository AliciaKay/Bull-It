var Pool = require('pg').Pool;


const config = {
  host: process.env.PGHOST,
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: process.env.PGUSER,     
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: true,
  max: 20
};

var ourPool = new Pool(config);

module.exports = ourPool;

  
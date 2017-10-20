var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
  console.log('in router.get');
  pool.connect(function (error, client, done) {
    if (error) {
      console.log('Error connecting to the DB', error);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM tasks WHERE due = CURRENT_DATE ORDER BY priority;', function (queryError, result) {
        done();
        if (queryError) {
          console.log('Error querying the DB', error);
          res.sendStatus(500);
        } else {
          console.log('Got rows from the DB:', result.rows);
          res.send(result.rows);
        }
      })
    }
  })
});
module.exports = router;
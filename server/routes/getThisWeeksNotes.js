var router = require('express').Router();
var pool = require('../modules/pool');

console.log('in the getThisWeeksNotes router');

router.get('/', function (req, res) {
  console.log('in router.get');
  pool.connect(function (error, client, done) {
    if (error) {
      console.log('Error connecting to the DB', error);
      res.sendStatus(500);
    } else {
      client.query('select * from notes where (extract(week from date)) = (extract(week from CURRENT_DATE)) order by date;', function (queryError, result) {
        done();
        if (queryError) {
          console.log('Error querying the DB', queryError);
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
var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
  console.log('in router.get');
  pool.connect(function (error, client, done) {
    if (error) {
      console.log('Error connecting to the DB', error);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM events;', function (queryError, result) {
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

// POST /events
//when the post call is made...
router.post('/', function (req, res) {
  //assign a variable to hold the item sent from the front-end client, req.body
  var newEvent = req.body;
  //connect the pool file and tell the client to insert the posted item to the DB, using the variable and the object's properties
  pool.connect(function (conErr, client, done) {
    if (conErr) {
      console.log('connection error: ', conErr)
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO events (title, details, date, time, location) VALUES ($1,$2, $3, $4, $5)', [newEvent.title, newEvent.details, newEvent.date, newEvent.time, newEvent.location], function (queryErr, resultObj) {
        done();
        if (queryErr) {
          res.sendStatus(500)
        } else {
          res.sendStatus(201)
        }
      });
    }
  });
});

module.exports = router;
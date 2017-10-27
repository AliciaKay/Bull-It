var router = require('express').Router();
var pool = require('../modules/pool');

// router.get('/', function (req, res) {
//   console.log('in router.get tasks');
//   pool.connect(function (error, client, done) {
//     if (error) {
//       console.log('Error connecting to the DB', error);
//       res.sendStatus(500);
//     } else {
//       client.query('SELECT * FROM tasks;', function (queryError, result) {
//         done();
//         if (queryError) {
//           console.log('Error querying the DB', error);
//           res.sendStatus(500);
//         } else {
//           console.log('Got rows from the DB:', result.rows);
//           res.send(result.rows);
//         }
//       })
//     }
//   })
// });

// POST /tasks
//when the post call is made...
router.post('/', function (req, res) {
  //assign a variable to hold the item sent from the front-end client, req.body
  console.log('in task post route', req.body);
  var newTask = req.body;
  //connect the pool file and tell the client to insert the posted item to the DB, using the variable and the object's properties
  pool.connect(function (conErr, client, done) {
    if (conErr) {
      console.log('connection error: ', conErr)
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO tasks (title, details, priority, due, pomos) VALUES ($1,$2, $3, $4, $5)', [newTask.title, newTask.details, newTask.priority, newTask.due, newTask.pomos], function (queryErr, resultObj) {
        done();
        if (queryErr) {
          console.log('broke it here', queryErr);
          res.sendStatus(500)
        } else {
          res.sendStatus(201)
        }
      });
    }
  });
});

module.exports = router;
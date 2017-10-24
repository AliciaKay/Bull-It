var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
  console.log('in router.get');
  pool.connect(function (error, client, done) {
    if (error) {
      console.log('Error connecting to the DB', error);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM notes WHERE date = CURRENT_DATE;', function (queryError, result) {
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

router.delete('/:id', function(req,res){
  var dbId= req.params.id;
  console.log('in the delete route', dbId)

  pool.connect(function (conErr, client, done){
      if (conErr){
          console.log(conErr);
          res.sendStatus(500);
      } else {
          client.query('DELETE FROM notes WHERE id = $1;', [dbId], function(queryErr, result){
              done();
              if(queryErr){
                  res.sendStatus(500);
              } else {
                  res.sendStatus(202);
              }
          }) ;
      }
  })
}); 

router.put('/:id', function (req, res) {
  console.log('in the notes put', req.body);
  var newNote = req.body;
  console.log("newNote:", newNote);
  var noteId = parseInt(req.params.id);
  console.log("noteId:", noteId);

  pool.connect(function (conErr, client, done){
      if (conErr){
          console.log(conErr);
          res.sendStatus(500);
      } else {
          console.log('no connection error');
          var queryString = 'UPDATE notes SET title = $1, details = $2, date = $3 WHERE id = $4;';
          client.query(queryString, [newNote.title, newNote.details, newNote.date, noteId], function(queryErr, resultObj) {
              done();
              if (queryErr) {
                  res.sendStatus(500)
               } else {
                  res.sendStatus(201)
               }
          });
      }
  })
});

module.exports = router;
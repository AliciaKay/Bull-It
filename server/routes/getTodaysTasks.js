var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('in router.get');
    pool.connect(function (error, client, done) {
        if (error) {
            console.log('Error connecting to the DB', error);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks WHERE due = CURRENT_DATE AND user_id = req.user.id ORDER BY priority;', function (queryError, result) {
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

router.delete('/:id', function (req, res) {
    var dbId = req.params.id;
    console.log('in the delete route', dbId)

    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM tasks WHERE id = $1;', [dbId], function (queryErr, result) {
                done();
                if (queryErr) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    })
});

router.put('/:id', function (req, res) {
    console.log('in the task put', req.body);
    var newTask = req.body;
    var taskId = req.params.id;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            var queryString = 'UPDATE tasks SET title = $1, details = $2, priority = $3, due = $4, pomos = $5, completedpomos = $6, completed = $7 WHERE id = $8;';
            client.query(queryString, [newTask.title, newTask.details, newTask.priority, newTask.due, newTask.pomos, newTask.completedpomos, newTask.completed, taskId], function (queryErr, resultObj) {
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
// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET user profile
router.get('/:id', function (req, res) {

    var userId = req.params.id;

    console.log('In user GET route.');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET user connection error ->', connectionError);
            res.sendStatus(500);
        } else {

            var user;

            var userQuery = "SELECT * FROM users WHERE user.id = $1"
            client.query(userQuery, [userId], function (queryErr, userResult) {

                if (queryErr) {
                    done(); // release pool worker
                    console.log('User Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    console.log('userResult.rows --> ', userResult.rows);

                    // store organization object
                    user = userResult.rows[0];
                } // end else
            }); // end userQuery
        } // end else
    }); // end pool connect
}); // end GET all org

module.exports = router;
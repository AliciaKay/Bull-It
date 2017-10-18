var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res) {
    var indexPath = path.join(__dirname, '../public/index.html');
    res.sendFile(indexPath);
});

module.exports = router;
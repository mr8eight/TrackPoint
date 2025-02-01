var events = require('../controllers/eventsController')

var express = require('express');
var router = express.Router();

router.get('/:id', events.queryEvents)

module.exports = router;
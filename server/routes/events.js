var events = require('../controllers/eventsController')

var express = require('express');
var router = express.Router();

// 查询
router.get('/:id', events.queryEvents)
router.get('/', events.getAllEvents);

// 创建
router.post('/', events.createEvent);

// 更新
router.put('/', events.updateEvent);

// 删除
router.delete('/:id', events.deleteEvent);


module.exports = router;
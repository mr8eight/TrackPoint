const express = require('express');
const eventAttributeController = require('../controllers/eventAttributeController');

const router = express.Router();

// 事件属性相关路由
router.post('/attributes', eventAttributeController.createEventAttribute);
router.get('/events/:event_id/attributes', eventAttributeController.getEventAttributes);
router.put('/attributes', eventAttributeController.updateEventAttribute);
router.delete('/attributes/:id', eventAttributeController.deleteEventAttribute);

module.exports = router;

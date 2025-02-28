const express = require('express');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

// 创建埋点数据
router.post('/tracking', trackingController.createTracking);

// 查询单个埋点数据
router.get('/tracking/:id', trackingController.getTrackingById);

// 更新埋点数据
router.put('/tracking', trackingController.updateTracking);

// 删除埋点数据
router.delete('/tracking/:id', trackingController.deleteTracking);

module.exports = router;

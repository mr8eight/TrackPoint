const express = require('express');
const trackingController = require('../controllers/trackingController');
const performanceController = require('../controllers/performanceController');

const router = express.Router();

router.get('/', trackingController.getAllTrackings);
router.get('/performance', performanceController.getPerformanceData);
// 创建埋点数据
router.post('/', trackingController.createTracking);

// 查询单个埋点数据
router.get('/:id', trackingController.getTrackingById);

// 更新埋点数据
router.put('/', trackingController.updateTracking);

// 删除埋点数据
router.delete('/:id', trackingController.deleteTracking);

module.exports = router;

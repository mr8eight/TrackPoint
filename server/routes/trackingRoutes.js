const express = require('express');
const trackingController = require('../controllers/trackingController');
const performanceController = require('../controllers/performanceController');
const actionController = require('../controllers/actionController');
const errorMonitorController = require('../controllers/errorMonitorController');

const router = express.Router();

router.get('/', trackingController.getAllTrackings);
router.get('/performance', performanceController.getPerformanceData);
router.get('/eventStats', actionController.getEventStats);
router.get('/errorMonitor', errorMonitorController.getErrorMonitorData);
// 创建埋点数据
router.post('/', trackingController.createTracking);

// 查询单个埋点数据
router.get('/:id', trackingController.getTrackingById);

// 更新埋点数据
router.put('/', trackingController.updateTracking);

// 删除埋点数据
router.delete('/:id', trackingController.deleteTracking);

module.exports = router;

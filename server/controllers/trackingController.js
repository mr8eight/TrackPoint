const db = require('../config/db');
const TrackingRepository = require('../repositories/trackingRepository');
const trackingRepo = new TrackingRepository(db);

// 创建埋点数据
const createTracking = async (req, res) => {
    const { event_id, user_id, app_id, event_time, attributes } = req.body;

    if (!event_id || !app_id || !event_time) {
        return res.status(400).send({ state: 1, message: "缺少必要参数" });
    }

    try {
        const result = await trackingRepo.createTracking(event_id, user_id, app_id, event_time);
        
        if (attributes && attributes.length > 0) {
            await trackingRepo.createTrackingAttributes(result.insertId, attributes);
        }
        
        return res.send({ state: 0, message: "埋点创建成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "埋点创建失败" });
    }
}

// 查询单个埋点数据
const getTrackingById = async (req, res) => {
    const { id } = req.params;

    try {
        const tracking = await trackingRepo.getTrackingById(id);
        if (!tracking) {
            return res.status(404).send({ state: 1, message: "未找到对应埋点" });
        }
        return res.send({ state: 0, message: "查询成功", data: tracking });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "查询失败" });
    }
}

// 更新埋点数据
const updateTracking = async (req, res) => {
    const { id, event_id, user_id, app_id, event_time } = req.body;

    try {
        const result = await trackingRepo.updateTracking(id, event_id, user_id, app_id, event_time);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应埋点" });
        }
        return res.send({ state: 0, message: "更新成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "更新失败" });
    }
}

// 删除埋点数据
const deleteTracking = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await trackingRepo.deleteTracking(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应埋点" });
        }
        return res.send({ state: 0, message: "删除成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "删除失败" });
    }
}

module.exports = {
    createTracking,
    getTrackingById,
    updateTracking,
    deleteTracking
}

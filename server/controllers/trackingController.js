const dbConfig = require('../config/dbConfig');
const TrackingRepository = require('../repositories/trackingRepository');
const trackingRepo = new TrackingRepository(dbConfig);

// 创建埋点数据
const createTracking = async (req, res) => {
    const { event_key, user_id, user_agent, app_id, app_version, app_type, current_url, event_time, attributes } = req.body;

    if (!event_key || !user_agent || !app_type || !current_url) {
        return res.status(400).send({ state: 1, message: "缺少必要参数" });
    }

    try {
        const result = await trackingRepo.createTracking(
            event_key, 
            user_id, 
            user_agent, 
            app_id, 
            app_version, 
            app_type, 
            current_url, 
            event_time
        );
        
        if (attributes && attributes.length > 0) {
            await trackingRepo.createTrackingAttributes(result.insertId, attributes);
        }
        
        return res.send({ state: 0, message: "埋点创建成功" });
    } catch (error) {
        console.log(error);
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
    const { id, event_id, user_id, user_agent, app_id, app_version, app_type, current_url, event_time } = req.body;

    if (!id || !event_id || !user_agent || !app_type || !current_url) {
        return res.status(400).send({ state: 1, message: "缺少必要参数" });
    }

    try {
        const result = await trackingRepo.updateTracking(
            id, 
            event_id, 
            user_id, 
            user_agent, 
            app_id, 
            app_version, 
            app_type, 
            current_url, 
            event_time
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应埋点" });
        }
        return res.send({ state: 0, message: "更新成功" });
    } catch (error) {
        console.error(error);
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

const getAllTrackings = async (req, res) => {
    const { page = 1, pageSize = 10, event_type, start_time, end_time } = req.query;

    if (!page || !pageSize) {
        return res.status(400).send({ state: 1, message: "缺少必要参数" });
    }

    try {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM tracking_data`;
        const params = [];

        const whereClauses = [];
        if (event_type) {
            whereClauses.push(`event_id = (SELECT id FROM events WHERE event_key = ?)`);
            params.push(event_type);
        }
        if (start_time) {
            whereClauses.push(`event_time >= ?`);
            params.push(start_time);
        }
        if (end_time) {
            whereClauses.push(`event_time <= ?`);
            params.push(end_time);
        }

        if (whereClauses.length > 0) {
            query += ` WHERE ${whereClauses.join(' AND ')}`;
        }

        query += ` LIMIT ? OFFSET ?`;
        params.push(Number(pageSize), Number(offset));

        const [trackings] = await trackingRepo.getAllTrackings(query, params);

        const countQuery = query.replace(/SELECT \*/, 'SELECT COUNT(*) as total');
        const [totalResult] = await trackingRepo.getAllTrackings(countQuery, params);

        return res.send({
            state: 0,
            message: "查询成功",
            data: {
                trackings,
                pagination: {
                    page: Number(page),
                    pageSize: Number(pageSize),
                    total: totalResult[0].total
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ state: 1, message: "查询失败" });
    }
};

module.exports = {
    createTracking,
    getTrackingById,
    updateTracking,
    deleteTracking,
    getAllTrackings
}

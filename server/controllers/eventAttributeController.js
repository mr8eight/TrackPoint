const db = require('../config/db');
const EventRepository = require('../repositories/eventRepository');
const eventRepo = new EventRepository(db);

// 创建事件属性
const createEventAttribute = async (req, res) => {
    const { event_id, attribute_name, attribute_type, is_required } = req.body;

    if (!event_id || !attribute_name || !attribute_type) {
        return res.status(400).send({ state: 1, message: "缺少必要参数" });
    }

    try {
        await eventRepo.createEventAttribute(event_id, attribute_name, attribute_type, is_required || 0);
        return res.send({ state: 0, message: "属性创建成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "属性创建失败" });
    }
}

// 获取事件的所有属性
const getEventAttributes = async (req, res) => {
    const { event_id } = req.params;

    try {
        const attributes = await eventRepo.getAttributesByEventId(event_id);
        return res.send({ state: 0, message: "查询成功", data: attributes });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "查询失败" });
    }
}

// 更新事件属性
const updateEventAttribute = async (req, res) => {
    const { id, attribute_name, attribute_type, is_required } = req.body;

    try {
        const result = await eventRepo.updateEventAttribute(id, attribute_name, attribute_type, is_required);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应属性" });
        }
        return res.send({ state: 0, message: "更新成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "更新失败" });
    }
}

// 删除事件属性
const deleteEventAttribute = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await eventRepo.deleteEventAttribute(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应属性" });
        }
        return res.send({ state: 0, message: "删除成功" });
    } catch (error) {
        return res.status(500).send({ state: 1, message: "删除失败" });
    }
}

module.exports = {
    createEventAttribute,
    getEventAttributes,
    updateEventAttribute,
    deleteEventAttribute
}

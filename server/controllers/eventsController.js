var db = require('../config/db')
const EventRepository = require('../repositories/eventRepository');
const eventRepo = new EventRepository(db);

// 查询单个事件
const queryEvents = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send({ state: 1, message: "无效的ID参数" });
    }

    try {
        const event = await eventRepo.getEventById(id);
        if (!event) {
            return res.status(404).send({ state: 1, message: "未找到对应事件" });
        }
        return res.send({ state: 0, message: "查询成功", data: event });
    } catch (err) {
        return res.status(500).send({ state: 1, message: "查询失败" });
    }
}

// 查询所有事件
const getAllEvents = async (req, res) => {
    try {
        const events = await eventRepo.getAllEvents();
        return res.send({ state: 0, message: "查询成功", data: events });
    } catch (err) {
        return res.status(500).send({ state: 1, message: "查询失败" });
    }
}

// 创建事件
const createEvent = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).send({ state: 1, message: "名称不能为空" });
    }

    try {
        const result = await eventRepo.createEvent(name, description);
        return res.send({ state: 0, message: "创建成功", data: { id: result.insertId } });
    } catch (err) {
        return res.status(500).send({ state: 1, message: "创建失败" });
    }
}

// 更新事件
const updateEvent = async (req, res) => {
    const { id, name, description } = req.body;

    try {
        const result = await eventRepo.updateEvent(id, name, description);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应事件" });
        }
        return res.send({ state: 0, message: "更新成功" });
    } catch (err) {
        return res.status(500).send({ state: 1, message: "更新失败" });
    }
}

// 删除事件
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await eventRepo.deleteEvent(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({ state: 1, message: "未找到对应事件" });
        }
        return res.send({ state: 0, message: "删除成功" });
    } catch (err) {
        return res.status(500).send({ state: 1, message: "删除失败" });
    }
}

module.exports = {
    queryEvents,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
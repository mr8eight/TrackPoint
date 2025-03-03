const { Op } = require('sequelize');
const {TrackingData, TrackingAttributes} = require('../models/TrackingData.js');

async function getErrorMonitorData(req, res) {
    const { startTime, endTime, urls = '', types = '', page = 1, pageSize = 10 } = req.query;
    try {
        // 构建查询条件
        const where = {
            event_id: 5, // 异常监控事件ID
        };

        // 如果传了startTime和endTime，添加时间范围条件
        if (startTime && endTime) {
            const start = new Date(startTime);
            const end = new Date(endTime);
            where.event_time = {
                [Op.between]: [start, end]
            };
        }
        
        // 如果传了urls参数，添加模糊匹配条件
        if (urls && urls.length > 0) {
            const urlList = urls ? urls.split(',') : [];
            where.current_url = {
                [Op.or]: urlList.map(url => ({
                    [Op.like]: `%${url}%`
                }))
            };
        }

        const attributeWhere = {
            attribute_id: {
                [Op.in]: [12, 13] // error_type, error_message
            }
        };
        // 如果传了types参数，添加过滤条件
        if (types && types.length > 0) {
            // 如果types是字符串，转换为数组
            const typeList = types ? types.split(',') : [];
            attributeWhere.attribute_value = {
                [Op.in]: typeList
            };
        }

        // 查询异常监控数据
        const { count, rows } = await TrackingData.findAndCountAll({
            where,
            include: [{
                model: TrackingAttributes,
                where: attributeWhere
            }],
            distinct: true, // 确保 count 只统计主表的唯一行数
            col: 'id', // 指定统计主表的 id 列
            offset: (page - 1) * pageSize,
            limit: parseInt(pageSize)
        });

        // 处理查询结果
        const data = rows.map(row => {
            const errorType = row.TrackingAttributes.find(attr => attr.attribute_id === 12)?.attribute_value || '';
            const errorMessage = row.TrackingAttributes.find(attr => attr.attribute_id === 13)?.attribute_value || '';

            return {
                id: row.id,
                url: row.current_url,
                type: errorType,
                message: errorMessage
            };
        }).filter(item => item !== null); // 过滤掉null值

        res.send({
            state: 0,
            message: "查询成功",
            data: {
                list: data,
                total: count,
            }
        });

    } catch (error) {
        console.error('查询异常监控数据失败:', error);
        res.status(500).json({ error: '查询异常监控数据失败' });
    }
}

module.exports = {
    getErrorMonitorData
};

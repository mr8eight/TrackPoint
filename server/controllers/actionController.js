const { Op } = require('sequelize');
const {TrackingData, TrackingAttributes} = require('../models/TrackingData.js');

async function getEventStats(req, res) {
    const { startTime, endTime, action } = req.body;

    // 验证参数
    if (!startTime || !endTime || !action) {
        return res.status(400).json({ error: '缺少必要参数' });
    }
    // 转换时间为Date对象
    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDiff = end - start;
    const isHourly = timeDiff <= 24 * 60 * 60 * 1000; // 判断是否按小时计算

    try {
        let query;
        switch (action) {
            case 'button_type_login':
                query = {
                    include: [{
                        model: TrackingAttributes,
                        where: {
                            attribute_id: 1,
                            attribute_value: '登录'
                        }
                    }]
                };
                break;
            case 'button_type_register':
                query = {
                    include: [{
                        model: TrackingAttributes,
                        where: {
                            attribute_id: 1,
                            attribute_value: '注册'
                        }
                    }]
                };
                break;
            case 'button_type_survey':
                query = {
                    include: [{
                        model: TrackingAttributes,
                        where: {
                            attribute_id: 1,
                            attribute_value: '提交问卷'
                        }
                    }]
                };
                break;
            case 'add_cart':
                query = { where: { event_id: 2 } };
                break;
            case 'page_jump_login':
                query = { 
                    where: { 
                        event_id: 3,
                        current_url: { [Op.like]: '%/login%' }
                    } 
                };
                break;
            case 'page_jump_register':
                query = { 
                    where: { 
                        event_id: 3,
                        current_url: { [Op.like]: '%/register%' }
                    } 
                };
                break;
            case 'page_jump_product':
                query = { 
                    where: { 
                        event_id: 3,
                        current_url: { [Op.like]: '%/product%' }
                    } 
                };
                break;
            default:
                return res.status(400).json({ error: '无效的action参数' });
        }

        // 添加时间范围条件
        query.where = query.where || {};
        query.where.event_time = { [Op.between]: [start, end] };

        // 查询数据
        const data = await TrackingData.findAll(query);

        // 按时间维度分组
        const timeSlots =  isHourly ? 
        Math.ceil((end - start) / (60 * 60 * 1000)) : // 按实际相差小时数计算
        Math.ceil(timeDiff / (24 * 60 * 60 * 1000));  // 按天计算

        //转换时间格式为YYYY-MM-DD HH:mm:ss
        let handleTimeString = (time) => {
            const date = new Date(time);
            // 转换为本地时间字符串
            return date.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // 使用24小时制
            }).replace(/\//g, '-'); // 将斜杠替换为横杠
        }
        
        // 生成时间维度范围数组
        const timeDimension = [];
        for (let i = 0; i < timeSlots; i++) {
            const slotTime = new Date(start.getTime() + (i * (isHourly ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000)));
            timeDimension.push(handleTimeString(slotTime));
        }

        const pv = new Array(timeSlots).fill(0);
        const uv = new Array(timeSlots).fill(0);
        const userSet = new Set();

        data.forEach(record => {
            const timeKey = isHourly ? 
                Math.floor((new Date(record.event_time) - start) / (60 * 60 * 1000)) : // 按小时计算索引
                Math.floor((new Date(record.event_time) - start) / (24 * 60 * 60 * 1000)); // 按天计算索引
            
            // console.log('timeKey: ', timeKey, handleTimeString(record.event_time), record.id);
            pv[timeKey]++;
            if (!userSet.has(record.user_id)) {
                uv[timeKey]++;
                userSet.add(record.user_id);
            }
        });

        res.send({
            state: 0,
            message: "查询成功",
            // data: data
            data: { pv, uv, timeDimension }
        });

    } catch (error) {
        console.error('查询事件统计数据失败:', error);
        res.status(500).json({ error: '查询事件统计数据失败' });
    }
}

async function updateEventTime(req, res) {
    const { ids, newTime } = req.body; // ids 是数组，newTime 是字符串格式的时间

    try {
        // 将字符串时间转换为 Date 对象
        const formattedTime = new Date(newTime);

        // 批量更新
        await TrackingData.update(
            { event_time: formattedTime },
            { where: { id: { [Op.in]: ids } } }
        );

        res.send({
            state: 0,
            message: "时间更新成功"
        });
    } catch (error) {
        console.error('更新时间失败:', error);
        res.status(500).json({ error: '更新时间失败' });
    }
}
module.exports = {
    getEventStats,
    updateEventTime
};

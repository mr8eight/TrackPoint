const { Op } = require('sequelize');
const {TrackingData, TrackingAttributes} = require('../models/TrackingData.js');
// const TrackingAttributes = require('../models/TrackingAttributes.js');

async function getPerformanceData(req, res) {
    // 将req.query改为req.body
    const { startTime, endTime, urls='' } = req.body;
    
    // 验证时间范围
    if (!startTime || !endTime) {
        return res.status(400).json({ error: 'startTime和endTime参数必填' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDiff = end - start;
    const isHourly = timeDiff <= 24 * 60 * 60 * 1000; // 判断是否按小时计算
    const timeSlots = isHourly ? 
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

    // 构建查询条件
    const where = {
        event_id: 4, // 性能监控事件ID
        event_time: {
            [Op.between]: [start, end]
        }
    };
            
    // 如果传了urls参数，添加模糊匹配条件
    if (urls && urls.length > 0) {
        const urlList = urls ? urls.split(',') : [];
        where.current_url = {
            [Op.or]: urlList.map(url => ({
                [Op.like]: `%${url}%`
            }))
        };
    }

    try {
        // 查询性能监控数据
        const performanceData = await TrackingData.findAll({
            where,
            include: [{
                model: TrackingAttributes,
                where: {
                    attribute_id: {
                        [Op.in]: [8, 9, 10, 11] // fp, fcp, lcp, cls
                    }
                }
            }]
        });
        // 初始化结果数组
        const result = {
            FP: { avg: new Array(timeSlots).fill(0), max: new Array(timeSlots).fill(0) },
            FCP: { avg: new Array(timeSlots).fill(0), max: new Array(timeSlots).fill(0) },
            LCP: { avg: new Array(timeSlots).fill(0), max: new Array(timeSlots).fill(0) },
            CLS: { avg: new Array(timeSlots).fill(0), max: new Array(timeSlots).fill(0) },
            timeDimension
        };

        const groupedData = {};
        // 处理每个时间段的性能数据
        performanceData.forEach(data => {
            const timeKey = isHourly ? 
                Math.floor((new Date(data.event_time) - start) / (60 * 60 * 1000)) : // 按小时计算索引
                Math.floor((new Date(data.event_time) - start) / (24 * 60 * 60 * 1000)); // 按天计算索引
            data.event_time = handleTimeString(data.event_time);
            if (!groupedData[timeKey]) {
                groupedData[timeKey] = {
                    fp: [],
                    fcp: [],
                    lcp: [],
                    cls: []
                };
            }
            // 解析性能指标
            if(data.TrackingAttributes) {
                data.TrackingAttributes.forEach(attr => {
                const value = parseFloat(attr.attribute_value);
                switch (attr.attribute_id) {
                    case 8: groupedData[timeKey].fp.push(value); break;
                    case 9: groupedData[timeKey].fcp.push(value); break;
                    case 10: groupedData[timeKey].lcp.push(value); break;
                    case 11: groupedData[timeKey].cls.push(value); break;
                }
            });
            }

        });
        for (let i = 0; i < timeSlots; i++) {
            result.FP.avg[i] = calculateAvg(groupedData[i]?.fp || []);
            result.FP.max[i] = calculateMax(groupedData[i]?.fp || []);
            result.FCP.avg[i] = calculateAvg(groupedData[i]?.fcp || []);
            result.FCP.max[i] = calculateMax(groupedData[i]?.fcp || []);
            result.LCP.avg[i] = calculateAvg(groupedData[i]?.lcp || []);
            result.LCP.max[i] = calculateMax(groupedData[i]?.lcp || []);
            result.CLS.avg[i] = calculateAvg(groupedData[i]?.cls || []);
            result.CLS.max[i] = calculateMax(groupedData[i]?.cls || []);
        }
        res.send({
            state: 0,
            message: "查询成功",
            // data: performanceData
            data: result
        });
    } catch (error) {
        console.error('查询性能监控数据失败:', error);
        res.status(500).json({ error: '查询性能监控数据失败' });
    }
}

function calculateAvg(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
}

function calculateMax(values) {
    if (values.length === 0) return 0;
    return Math.max(...values);
}

module.exports = {
    getPerformanceData
};

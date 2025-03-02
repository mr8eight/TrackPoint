const { Op } = require('sequelize');
const {TrackingData, TrackingAttributes} = require('../models/TrackingData.js');
// const TrackingAttributes = require('../models/TrackingAttributes.js');

async function getPerformanceData(req, res) {
    const { startTime, endTime, url } = req.query;
    
    // 验证时间范围
    if (!startTime || !endTime) {
        return res.status(400).json({ error: 'startTime和endTime参数必填' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDiff = end - start;
    const isHourly = timeDiff <= 24 * 60 * 60 * 1000; // 判断是否按小时计算

    // 构建查询条件
    const where = {
        event_id: 4, // 性能监控事件ID
        event_time: {
            [Op.between]: [start, end]
        }
    };
    if (url) {
        where.current_url = url;
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

        // 按时间维度分组
        const groupedData = {};
        let timeData = []
        performanceData.forEach(data => {
            const timeKey = isHourly ? 
                new Date(data.event_time).toISOString().slice(0, 13) : // 按小时
                new Date(data.event_time).toISOString().slice(0, 10); // 按天

            if (!groupedData[timeKey]) {
                groupedData[timeKey] = {
                    fp: [],
                    fcp: [],
                    lcp: [],
                    cls: []
                };
            }
            // 解析性能指标
            data.TrackingAttributes.forEach(attr => {
                const value = parseFloat(attr.attribute_value);
                switch (attr.attribute_id) {
                    case 8: groupedData[timeKey].fp.push(value); break;
                    case 9: groupedData[timeKey].fcp.push(value); break;
                    case 10: groupedData[timeKey].lcp.push(value); break;
                    case 11: groupedData[timeKey].cls.push(value); break;
                }
            });
            // 转换时间格式
            const formattedTime = new Date(data.event_time).toISOString().replace('T', ' ').slice(0, 19);
            timeData.push(formattedTime);
        });

        // 计算结果
        const result = {
            FP: { avg: [], max: [] },
            FCP: { avg: [], max: [] },
            LCP: { avg: [], max: [] },
            CLS: { avg: [], max: [] },
            timeData
        };

        Object.keys(groupedData).sort().forEach(timeKey => {
            const data = groupedData[timeKey];
            result.FP.avg.push(calculateAvg(data.fp));
            result.FP.max.push(calculateMax(data.fp));
            result.FCP.avg.push(calculateAvg(data.fcp));
            result.FCP.max.push(calculateMax(data.fcp));
            result.LCP.avg.push(calculateAvg(data.lcp));
            result.LCP.max.push(calculateMax(data.lcp));
            result.CLS.avg.push(calculateAvg(data.cls));
            result.CLS.max.push(calculateMax(data.cls));
        });

        res.json(result);
        // res.json(performanceData);
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

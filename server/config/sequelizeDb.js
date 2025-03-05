const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('track_point', 'root', 'Aa125314157', {
    host: 'localhost',
    dialect: 'mysql', // 根据你的数据库类型修改
    timezone: '+08:00', // 设置为东八区
    logging: false // 关闭日志输出
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('track_point', 'root', 'mysql99', {
    host: 'localhost',
    dialect: 'mysql', // 根据你的数据库类型修改
    logging: true // 关闭日志输出
});

module.exports = sequelize;

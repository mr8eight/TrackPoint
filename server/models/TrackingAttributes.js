const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDb'); // 数据库配置

const TrackingAttributes = sequelize.define('TrackingAttributes', {
    tracking_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    attribute_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    attribute_value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tracking_attributes', // 确保表名与数据库一致
    timestamps: true // 如果表没有 createdAt 和 updatedAt 字段
});

// 定义关联关系
TrackingAttributes.associate = function(models) {
    TrackingAttributes.belongsTo(models.TrackingData, {
        foreignKey: 'tracking_id',
        as: 'TrackingData'
    });
};

module.exports = TrackingAttributes;

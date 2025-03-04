const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDb'); // 数据库配置

const TrackingData = sequelize.define('TrackingData', {
    id: {
        type: DataTypes.BIGINT, // 确保类型为 INTEGER
        primaryKey: true,
        autoIncrement: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    current_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_agent: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tracking_data', // 确保表名与数据库一致
    timestamps: false // 如果表没有 createdAt 和 updatedAt 字段
});

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
    timestamps: false // 如果表没有 createdAt 和 updatedAt 字段
});

TrackingData.hasMany(TrackingAttributes, {
    foreignKey: 'tracking_id',
    // as: 'TrackingAttributes'
});
TrackingAttributes.belongsTo(TrackingData, {
    foreignKey: 'tracking_id',
    // as: 'TrackingData'
});
// 定义关联关系
// TrackingData.associate = function(models) {
//     TrackingData.hasMany(models.TrackingAttributes, {
//         foreignKey: 'tracking_id',
//         as: 'TrackingAttributes'
//     });
// };
module.exports = {
    TrackingData,
    TrackingAttributes
};

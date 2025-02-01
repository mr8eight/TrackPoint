// 1.导入mysql模块
const mysql = require("mysql2");

// 2.建立与mysql 数据库的链接
const db = mysql.createPool({
    host: "127.0.0.1", // 数据库的ip地址
    user: "root", // 登录数据库的账号
    password: "root", // 登录数据库的密码
    port: 3306, // mysql数据库的端口号
    database: "track_point", //指定要操作的数据库
});

// 3.导出数据库链接对象
module.exports = db;
module.exports = {
    host: "127.0.0.1", // 数据库的ip地址
    user: "root", // 登录数据库的账号
    password: "mysql99", // 登录数据库的密码
    port: 3306, // mysql数据库的端口号
    database: "track_point", //指定要操作的数据库
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

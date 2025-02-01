var db = require('../config/db')

const queryEvents = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const sql = `SELECT * FROM events WHERE id=${id}`
    // 执行sql语句
    db.query(sql, (err, result) => {
        // 执行失败
        if (err) {
            return res.send({ state: 1, message: err });
        }
        //执行成功后返回，表中的数据
        return res.send({ state: 0, message: "查询成功", data: result });
    });
}

module.exports = {
    queryEvents: queryEvents
}


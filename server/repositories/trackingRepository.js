class TrackingRepository {
    constructor(db) {
        this.db = db;
    }

    async createTracking(event_id, user_id, app_id, event_time) {
        const sql = `INSERT INTO tracking_data 
                    (event_id, user_id, app_id, event_time) 
                    VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [event_id, user_id, app_id, event_time], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async createTrackingAttributes(tracking_id, attributes) {
        const sql = `INSERT INTO tracking_attributes 
                    (tracking_id, attribute_id, attribute_value) 
                    VALUES ?`;
        const values = attributes.map(attr => [
            tracking_id,
            attr.attribute_id,
            attr.attribute_value
        ]);
        return new Promise((resolve, reject) => {
            this.db.query(sql, [values], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async getTrackingById(id) {
        const sql = `SELECT * FROM tracking_data WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0 ? result[0] : null);
            });
        });
    }

    async updateTracking(id, event_id, user_id, app_id, event_time) {
        const sql = `UPDATE tracking_data 
                    SET event_id=?, user_id=?, app_id=?, event_time=? 
                    WHERE id=?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [event_id, user_id, app_id, event_time, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async deleteTracking(id) {
        const sql = `DELETE FROM tracking_data WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = TrackingRepository;

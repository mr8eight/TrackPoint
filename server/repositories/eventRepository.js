class EventRepository {
    constructor(db) {
        this.db = db;
    }

    async getEventById(id) {
        const sql = `SELECT * FROM events WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0 ? result[0] : null);
            });
        });
    }

    async getAllEvents() {
        const sql = `SELECT * FROM events`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async createEvent(name, description) {
        const sql = `INSERT INTO events (name, description) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [name, description], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async updateEvent(id, name, description) {
        const sql = `UPDATE events SET name = ?, description = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [name, description, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async deleteEvent(id) {
        const sql = `DELETE FROM events WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async createEventAttribute(event_id, attribute_name, attribute_type, is_required) {
        const sql = `INSERT INTO event_attributes 
                    (event_id, attribute_name, attribute_type, is_required) 
                    VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [event_id, attribute_name, attribute_type, is_required], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async getAttributesByEventId(event_id) {
        const sql = `SELECT * FROM event_attributes WHERE event_id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [event_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async updateEventAttribute(id, attribute_name, attribute_type, is_required) {
        const sql = `UPDATE event_attributes 
                    SET attribute_name=?, attribute_type=?, is_required=? 
                    WHERE id=?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [attribute_name, attribute_type, is_required, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    async deleteEventAttribute(id) {
        const sql = `DELETE FROM event_attributes WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = EventRepository;
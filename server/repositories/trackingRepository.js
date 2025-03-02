const mysql = require('mysql2/promise');

class TrackingRepository {
    constructor(dbConfig) {
        this.pool = mysql.createPool(dbConfig);
    }

    async createTracking(event_key, user_id, user_agent, app_id, app_version, app_type, current_url, event_time) {
        const connection = await this.pool.getConnection();
        try {
            const [eventResult] = await connection.query(
                `SELECT id FROM events WHERE event_key = ?`, 
                [event_key]
            );
            if (eventResult.length === 0) {
                throw new Error(`Event key ${event_key} not found`);
            }
            const event_id = eventResult[0].id;
    
            const [result] = await connection.query(
                `INSERT INTO tracking_data 
                (event_id, user_id, user_agent, app_id, app_version, app_type, current_url, event_time) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [event_id, user_id, user_agent, app_id, app_version, app_type, current_url, event_time || new Date().toISOString().slice(0, 19).replace('T', ' ')]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    async createTrackingAttributes(tracking_id, attributes) {
        const connection = await this.pool.getConnection();
        try {
            const attributePromises = attributes.map(async attr => {
                const [result] = await connection.query(
                    `SELECT id FROM event_attributes WHERE attribute_key = ?`,
                    [attr.attribute_key]
                );
                if (result.length === 0) {
                    throw new Error(`Attribute key ${attr.attribute_key} not found`);
                }
                return {
                    attribute_id: result[0].id,
                    attribute_value: attr.attribute_value
                };
            });

            const resolvedAttributes = await Promise.all(attributePromises);

            const values = resolvedAttributes.map(attr => [
                tracking_id,
                attr.attribute_id,
                attr.attribute_value
            ]);

            const [result] = await connection.query(
                `INSERT INTO tracking_attributes 
                (tracking_id, attribute_id, attribute_value) 
                VALUES ?`,
                [values]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    async getTrackingById(id) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(
                `SELECT * FROM tracking_data WHERE id = ?`,
                [id]
            );
            return result.length > 0 ? result[0] : null;
        } finally {
            connection.release();
        }
    }

    async updateTracking(id, event_id, user_id, user_agent, app_id, app_version, app_type, current_url, event_time) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(
                `UPDATE tracking_data 
                SET event_id=?, user_id=?, user_agent=?, 
                    app_id=?, app_version=?, app_type=?, 
                    current_url=?, event_time=?
                WHERE id=?`,
                [event_id, user_id, user_agent, app_id, app_version, app_type, current_url, event_time, id]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    async deleteTracking(id) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(
                `DELETE FROM tracking_data WHERE id = ?`,
                [id]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    async getAllTrackings(query, params) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(query, params);
            return result;
        } finally {
            connection.release();
        }
    }
}

module.exports = TrackingRepository;

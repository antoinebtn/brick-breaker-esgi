import pool from '../services/db-service.js';

class User {
    static async getTopScores(limit = 10) {
        const [rows] = await pool.query(
            'SELECT username, score FROM scores ORDER BY score DESC LIMIT ?',
            [limit]
        );
        return rows;
    }

    static async saveScore(username, score) {
        const [result] = await pool.query(
            'INSERT INTO scores (username, score) VALUES (?, ?)',
            [username, score]
        );
        return result;
    }
}

export default User;

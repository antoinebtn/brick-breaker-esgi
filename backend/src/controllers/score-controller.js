import Score from '../models/score.js';

class UserController {
    static async getTopScores(req, res) {
        try {
            const scores = await Score.getTopScores();
            res.json(scores);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    static async saveScore(req, res) {
        const {username, score} = req.body;

        if (!username || !score) {
            return res.status(400).json({error: 'Username and score are required'});
        }

        try {
            const result = await Score.saveScore(username, score);
            res.status(201).json({id: result.insertId, username, highscore: score});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

export default UserController;

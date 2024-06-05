import {Router} from 'express';
import scoreController from '../controllers/score-controller.js';

const router = Router();

router.get('/top-scores', scoreController.getTopScores);

router.post('/score', scoreController.saveScore);

export default router;

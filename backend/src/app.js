import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import scoreRoutes from './routes/score-routes.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());


app.use('/api/', scoreRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

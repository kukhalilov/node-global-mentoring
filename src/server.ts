import express from 'express';
import router from './api/routes/index.js';
import cors from 'cors';
import './utils/errorHandling.js';

const createServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', router);

    app.get('/', (req, res) => {
        res.send('Welcome to our application!');
    });

    return app;
};

export default createServer;

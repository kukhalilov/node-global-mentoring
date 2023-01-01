import express from 'express';
import router from './api/routes/index.js';

const app = express();
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Welcome to our application!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

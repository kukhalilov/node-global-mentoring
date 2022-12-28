import express from 'express';
import router from './routes/users';

const app = express();
app.use(express.json());
app.use('/api/users', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

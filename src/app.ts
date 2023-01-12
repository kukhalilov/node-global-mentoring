import dbInit from './db/init.js';
import createServer from './server.js';
import logger from './utils/logger.js';

const app = createServer();

app.use(logger);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Listening on port ${port}...`);

    await dbInit();
});

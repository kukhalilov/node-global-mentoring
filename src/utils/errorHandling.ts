import winston, { transports } from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
    transports: [
        new transports.Console()
    ]
});


// uncaught exception error handling
process.on('uncaughtException', (ex: Error) => {
    logger.error(ex.message, ex);
    process.exit(1);
});

// unhandled promise rejection error handling
process.on('unhandledRejection', (ex: Error) => {
    logger.error(ex.message, ex);
    process.exit(1);
});

import { Router, Request, Response, NextFunction } from 'express';
import usersRouter from './users.js';
import groupsRouter from './groups.js';

const router = Router();

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method: ${req.method}, url: ${req.originalUrl}`);
    console.log(`Method body: ${JSON.stringify(req.body)}`);
    next();
};

router.use('/users', logger, usersRouter);
router.use('/groups', logger, groupsRouter);

export default router;

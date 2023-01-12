import { Router, Request, Response, NextFunction } from 'express';
import usersRouter from './users.js';
import groupsRouter from './groups.js';
import authRouter from './auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method: ${req.method}, url: ${req.originalUrl}`);
    console.log(`Method body: ${JSON.stringify(req.body)}`);
    next();
};

router.use('/users', [verifyToken, logger], usersRouter);
router.use('/groups', [verifyToken, logger], groupsRouter);
router.use('/auth', logger, authRouter);

export default router;

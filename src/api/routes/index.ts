import { Router } from 'express';
import usersRouter from './users.js';
import groupsRouter from './groups.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/groups', groupsRouter);

export default router;

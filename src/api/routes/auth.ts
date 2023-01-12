import { Router, Request, Response } from 'express';
import * as authController from '../controllers/auth/index.js';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send('Bad request');
    }
    const token = await authController.login(login, password);
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    return res.header('authorization', `Bearer ${token}`).status(200).send(token);
});

export default authRouter;

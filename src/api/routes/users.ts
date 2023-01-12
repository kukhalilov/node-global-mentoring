import { Router, Request, Response } from 'express';
import * as userController from '../controllers/user/index.js';
import { CreateUserDTO, UpdateUserDTO } from '../../db/dto/user.dto.js';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 5;
        const loginSubstring = req.query.loginSubstring
            ? (req.query.loginSubstring as string)
            : '';
        const result = await userController.getAutoSuggestUsers(loginSubstring, limit);
        return res.status(200).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await userController.getById(id);
        return res.status(200).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateUserDTO = req.body;
        const result = await userController.create(payload);
        return res.status(201).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

usersRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const payload:UpdateUserDTO = req.body;
        const result = await userController.update(id, payload);
        return res.status(200).send(result);
    } catch (error: any) {
        res.status(404).send(error.message);
    }
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await userController.deleteById(id);
        return res.status(200).send('User successfully deleted');
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

export default usersRouter;

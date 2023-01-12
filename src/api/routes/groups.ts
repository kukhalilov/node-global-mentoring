import { Router, Request, Response } from 'express';
import * as groupController from '../controllers/group/index.js';
import { CreateGroupDTO, UpdateGroupDTO } from '../../db/dto/group.dto.js';

const groupsRouter = Router();

groupsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await groupController.getAll();
        return res.status(200).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

groupsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await groupController.getById(id);
        return res.status(200).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

groupsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload:CreateGroupDTO = req.body;
        const result = await groupController.create(payload);
        return res.status(201).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

groupsRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const payload:UpdateGroupDTO = req.body;
        const result = await groupController.update(id, payload);
        return res.status(200).send(result);
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

groupsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await groupController.deleteById(id);
        return res.status(200).send('Group successfully deleted');
    } catch (error: any) {
        return res.status(404).send(error.message);
    }
});

export default groupsRouter;

import express from 'express';
import { validateUser, getAutoSuggestUsers, createUser, getUser,
    updateUser, deleteUser } from '../controllers/users';


const router = express.Router();

router.get('/', getAutoSuggestUsers);

router.get('/:id', getUser);

router.post('/', validateUser, createUser);

router.put('/:id', validateUser, updateUser);

router.delete('/:id', deleteUser);

export default router;

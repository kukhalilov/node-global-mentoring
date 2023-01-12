import * as service from '../../services/userService.js';
import { CreateUserDTO, UpdateUserDTO } from '../../../db/dto/user.dto.js';
import User from '../../interfaces/index.js';
import * as mapper from './mapper.js';

export const create = async (payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload));
};

export const update = async (id: string, payload: UpdateUserDTO): Promise<User> => {
    return mapper.toUser(await service.update(id, payload));
};

export const getById = async (id: string): Promise<User> => {
    return mapper.toUser(await service.getById(id));
};

export const deleteById = async (id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id);
    return isDeleted;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> => {
    const users = await service.getAutoSuggestUsers(loginSubstring, limit);
    return users.map(mapper.toUser);
};

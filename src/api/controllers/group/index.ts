import * as service from '../../services/groupService.js';
import { CreateGroupDTO, UpdateGroupDTO } from '../../../db/dto/group.dto.js';
import { Group } from '../../interfaces/index.js';
import * as mapper from './mapper.js';

export const create = async (payload: CreateGroupDTO): Promise<Group> => {
    return mapper.toGroup(await service.create(payload));
};

export const update = async (id: string, payload: UpdateGroupDTO): Promise<Group> => {
    return mapper.toGroup(await service.update(id, payload));
};

export const getById = async (id: string): Promise<Group> => {
    return mapper.toGroup(await service.getById(id));
};

export const deleteById = async (id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id);
    return isDeleted;
};

export const getAll = async (): Promise<Group[]> => {
    const groups = await service.getAll();
    return groups.map(mapper.toGroup);
};

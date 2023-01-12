import * as groupDal from '../../db/data-access/group.js';
import { GroupInput, GroupOutput } from '../../db/models/Group.js';

export const create = (payload: GroupInput): Promise<GroupOutput> => {
    return groupDal.create(payload);
};

export const update = (id: string, payload: Partial<GroupInput>): Promise<GroupOutput> => {
    return groupDal.update(id, payload);
};

export const getById = (id: string): Promise<GroupOutput> => {
    return groupDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
    return groupDal.deleteById(id);
};

export const getAll = (): Promise<GroupOutput[]> => {
    return groupDal.getAll();
};

import Group from '../models/Group.js';
import { GroupInput, GroupOutput } from '../models/Group.js';

export const create = async (payload: GroupInput): Promise<GroupOutput> => {
    const group = await Group.create(payload);
    return group;
};

export const update = async (id: string, payload: Partial<GroupInput>): Promise<GroupOutput> => {
    const group = await Group.findByPk(id);
    const updatedGroup = await (group as Group).update(payload);
    return updatedGroup;
};

export const getById = async (id: string): Promise<GroupOutput> => {
    const group = await Group.findByPk(id) as GroupOutput;
    return group;
};

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedGroupCount = await Group.destroy({
        where: { id }
    });
    return !!deletedGroupCount;
};

export const getAll = async (): Promise<GroupOutput[]> => {
    return await Group.findAll();
};

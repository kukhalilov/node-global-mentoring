import { Permission } from '../models/Group.js';

export type CreateGroupDTO = {
    name: string;
    permissions: Permission[];
}

export type UpdateGroupDTO = CreateGroupDTO;

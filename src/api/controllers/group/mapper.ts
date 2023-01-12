import { Group } from '../../interfaces/index.js';
import { GroupOutput } from '../../../db/models/Group.js';

export const toGroup = (user: GroupOutput): Group => {
    return {
        id: user.id,
        name: user.name,
        permissions: user.permissions
    };
};

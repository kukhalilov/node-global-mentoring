import { Permission } from '../../db/models/Group.js';

export interface Group {
    id: string;
    name: string;
    permissions: Permission[];
}

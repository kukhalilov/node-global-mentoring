import { User } from '../../interfaces/index.js';
import { UserOutput } from '../../../db/models/User.js';

export const toUser = (user: UserOutput): User => {
    return {
        id: user.id,
        login: user.login,
        password: user.password,
        age: user.age,
        isDeleted: user.isDeleted
    };
};

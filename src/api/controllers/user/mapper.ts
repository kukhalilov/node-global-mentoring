import User from '../../interfaces/index.js';
import { UserOuput } from '../../../db/models/User.js';

export const toUser = (user: UserOuput): User => {
    return {
        id: user.id,
        login: user.login,
        password: user.password,
        age: user.age,
        isDeleted: user.isDeleted
    };
};

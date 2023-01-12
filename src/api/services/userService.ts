import * as userDal from '../../db/data-access/user.js';
import { UserInput, UserOutput } from '../../db/models/User.js';

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDal.create(payload);
};

export const update = (id: string, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload);
};

export const getById = (id: string): Promise<UserOutput> => {
    return userDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
    return userDal.deleteById(id);
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): Promise<UserOutput[]> => {
    return userDal.getAutoSuggestUsers(loginSubstring, limit);
};

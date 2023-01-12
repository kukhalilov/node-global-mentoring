import * as userDal from '../../db/data-access/user.js';
import { UserInput, UserOuput } from '../../db/models/User.js';

export const create = (payload: UserInput): Promise<UserOuput> => {
    return userDal.create(payload);
};

export const update = (id: string, payload: Partial<UserInput>): Promise<UserOuput> => {
    return userDal.update(id, payload);
};

export const getById = (id: string): Promise<UserOuput> => {
    return userDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
    return userDal.deleteById(id);
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): Promise<UserOuput[]> => {
    return userDal.getAutoSuggestUsers(loginSubstring, limit);
};

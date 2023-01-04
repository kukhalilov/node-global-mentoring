import { Op } from 'sequelize';
import User from '../models/User.js';
import { UserInput, UserOutput } from '../models/User.js';

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload);
    return user;
};

export const update = async (id: string, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id);
    const updatedUser = await (user as User).update(payload);
    return updatedUser;
};

export const getById = async (id: string): Promise<UserOutput> => {
    const user = await User.findByPk(id) as UserOutput;
    return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
    const user = await User.findByPk(id);
    user!.isDeleted = true;
    await user!.save();
    return true;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<UserOutput[]> => {
    if (loginSubstring !== '') {
        return await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit,
            order: [
                ['login', 'ASC']
            ]
        });
    }
    return await User.findAll({
        limit,
        order: [
            ['login', 'ASC']
        ]
    });
};

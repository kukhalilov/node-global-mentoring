import { Optional } from 'sequelize/types';

export type CreateUserDTO = {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'isDeleted'>

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const bodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().custom((value: string, helpers) => {
        if (!value.match(/^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required().messages({
        'any.invalid': 'Password must be between 4 and 10 characters' +
        ' long and contain at least one letter and one number'
    }),
    age: Joi.number().integer().greater(4).less(130).required().messages({
        'number.base': 'Age must be a number',
        'number.integer': 'Age must be an integer',
        'number.greater': 'Age must be greater than 4',
        'number.less': 'Age must be less than 130'
    },)
});

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const users: User[] = [];

export const validateUser =  validator.body(bodySchema);

export const getAutoSuggestUsers = (
    req: express.Request,
    res: express.Response
) => {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const loginSubstring = req.query.loginSubstring
        ? (req.query.loginSubstring as string)
        : '';
    const filteredUsers = users.filter((u) => u.login.includes(loginSubstring));
    const sortedUsers = filteredUsers.sort((a, b) =>
        a.login.localeCompare(b.login)
    );
    const suggestedUsers = sortedUsers.slice(0, limit);
    res.json(suggestedUsers);
};

export const getUser = (req: express.Request, res: express.Response) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).send('The user not found.');
    }
    res.json(user);
};

export const createUser = (req: express.Request, res: express.Response) => {
    const user: User = {
        id: uuidv4(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    };
    users.push(user);
    res.json(user);
};

export const updateUser = (req: express.Request, res: express.Response) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).send('The user not found.');
    }
    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;
    res.json(user);
};

export const deleteUser = (req: express.Request, res: express.Response) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).send('The user not found.');
    }
    user.isDeleted = true;
    res.json(user);
};

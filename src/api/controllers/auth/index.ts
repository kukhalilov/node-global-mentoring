import jwt, { Secret } from 'jsonwebtoken';
import User from '../../../db/models/User.js';

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ where: { login: username, password } });

    if (!user) return null;

    const token = jwt.sign({ id: user.id }, process.env.MY_SECRET as Secret, { expiresIn: '1h' });
    return token;
};

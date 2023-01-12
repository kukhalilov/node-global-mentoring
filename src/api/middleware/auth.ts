import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Unauthorized request');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Invalid token');
        }

        jwt.verify(token, process.env.MY_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }

            req.body.user = decoded;
            next();
        });
    } catch (error) {
        return res.send(error);
    }
};

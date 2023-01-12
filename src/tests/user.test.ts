import supertest from 'supertest';
import createServer from '../server.js';
import dbInit from '../db/init.js';

const app = createServer();

beforeAll(async () => {
    await dbInit();
});

describe('User', () => {
    it('should get 401 without authorization', async () => {
        await supertest(app).get('/api/users').expect(401);
    });

    it('should get 403 with wrong authorization', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'admin' });
        await supertest(app).get('/api/users').set('authorization', `Bearer ${token.text}`).expect(403);
    });

    it('should get users with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).get('/api/users').set('authorization', `Bearer ${token.text}`).expect(200);
    });

    it('should get 404 with wrong id with authorization', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).get('/api/users/1').set('authorization', `Bearer ${token.text}`).expect(404);
    });

    it('should get user by id with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/users').set('authorization', `Bearer ${token.text}`);
        await supertest(app).get(`/api/users/${test.body[0].id}`).set('authorization', `Bearer ${token.text}`).expect(200);
    });

    it('should post user with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).post('/api/users').set('authorization', `Bearer ${token.text}`).send({ login: 'test1',
            password: 'test1', age: 10, isDeleted: false }).expect(201);
    });

    it('should update user with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/users').set('authorization', `Bearer ${token.text}`);
        await supertest(app).put(`/api/users/${test.body[1].id}`).set('authorization', `Bearer ${token.text}`).
            send({ login: 'test2', password: 'test2', age: 11, isDeleted: false }).expect(200);
    });

    it('should delete user with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/users').set('authorization', `Bearer ${token.text}`);
        await supertest(app).delete(`/api/users/${test.body[1].id}`).set('authorization', `Bearer ${token.text}`).expect(200);
    });
});

import supertest from 'supertest';
import createServer from '../server.js';
import dbInit from '../db/init.js';

const app = createServer();

beforeAll(async () => {
    await dbInit();
});

describe('Group', () => {
    it('should get 401 without authorization', async () => {
        await supertest(app).get('/api/groups').expect(401);
    });

    it('should get 403 with wrong authorization', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'admin' });
        await supertest(app).get('/api/groups').set('authorization', `Bearer ${token.text}`).expect(403);
    });

    it('should get groups with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).get('/api/groups').set('authorization', `Bearer ${token.text}`).expect(200);
    });

    it('should get 404 with wrong id with authorization', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).get('/api/groups/1').set('authorization', `Bearer ${token.text}`).expect(404);
    });

    it('should get group by id with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/groups').set('authorization', `Bearer ${token.text}`);
        await supertest(app).get(`/api/groups/${test.body[0].id}`).set('authorization', `Bearer ${token.text}`).expect(200);
    });

    it('should post group with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        await supertest(app).post('/api/groups').set('authorization', `Bearer ${token.text}`).send({ 'name': 'group1',
            'permissions': [
                'READ',
                'WRITE',
                'SHARE'
            ] }).expect(201);
    });

    it('should update group with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/groups').set('authorization', `Bearer ${token.text}`);
        await supertest(app).put(`/api/groups/${test.body[1].id}`).set('authorization', `Bearer ${token.text}`).
            send({ 'name': 'group2',
                'permissions': [
                    'READ',
                    'WRITE',
                    'SHARE',
                    'UPLOAD_FILES'
                ] }).expect(200);
    });

    it('should delete group with authorization ', async () => {
        const token = await supertest(app).post('/api/auth/login').send({ login: 'admin', password:'pass1' });
        const test = await supertest(app).get('/api/groups').set('authorization', `Bearer ${token.text}`);
        await supertest(app).delete(`/api/groups/${test.body[1].id}`).set('authorization', `Bearer ${token.text}`).expect(200);
    });
});

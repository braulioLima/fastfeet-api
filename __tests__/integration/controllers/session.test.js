import '../../../src/bootstrap';
import supertest from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

let server;
let request;

describe('Authenticate', () => {
  beforeEach(async () => {
    await truncate();
    server = await app.listen(process.env.SUPERTEST_PORT);
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  it('should be able authenticate with valid credentials', async () => {
    await factory.create('user', {
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    const { status } = await request.post('/sessions').send({
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    expect(status).toBe(201);
  });

  it('should not be able authenticate with invalid credentials', async () => {
    const { status } = await request.post('/sessions');

    expect(status).toBe(400);
  });

  it('should not be able authenticate of user not registred', async () => {
    await factory.create('user');

    const user = await factory.attrs('login');

    const { status } = await request.post('/sessions').send(user);

    expect(status).toBe(401);
  });

  it('should not be able authenticate users with incorrect password', async () => {
    await factory.create('user', { email: 'test@test.com' });

    const credentials = await factory.attrs('login', {
      email: 'test@test.com',
    });

    const { status } = await request.post('/sessions').send(credentials);

    expect(status).toBe(401);
  });

  it('should be return jwt token when authenticated', async () => {
    await factory.create('user', {
      email: 'test@test.com',
      password: '123456',
    });

    const credentials = await factory.attrs('login', {
      email: 'test@test.com',
      password: '123456',
    });

    const { body } = await request.post('/sessions').send(credentials);

    expect(body).toHaveProperty('token');
  });
});

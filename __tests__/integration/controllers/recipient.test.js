import supertest from 'supertest';
import '../../../src/bootstrap';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

let server;
let request;

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
    server = await app.listen(process.env.SUPERTEST_PORT);
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  it('should be able store a recipient', async () => {
    const recipient = await factory.attrs('recipient');

    const user = await factory.create('user');

    const token = user.generateToken();

    const { status, body } = await request
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not be able store recipients without correct data', async () => {
    const user = await factory.create('user', {
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    const token = user.generateToken();

    const { status } = await request
      .post('/recipients')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
  });
});

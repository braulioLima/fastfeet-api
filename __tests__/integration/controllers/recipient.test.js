import request from 'supertest';
import '../../../src/bootstrap';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Recipient', () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
    await truncate();
  });

  it('should be able store a recipient', async () => {
    const recipient = await factory.attrs('recipient');

    const user = await factory.create('user');

    const token = user.generateToken();

    const { status, body } = await request(app)
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

    const { status } = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
  });

  it('should be able update a recipient', async () => {
    const { id } = await factory.create('recipient');

    const recipient = await factory.attrs('recipient', {
      street: 'rua almeida prado',
    });

    const user = await factory.create('user');

    const token = user.generateToken();

    const { status } = await request(app)
      .put(`/recipients/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(recipient);

    expect(status).toBe(200);
  });

  it('should not be able update recipients without correct data', async () => {
    const { id } = await factory.create('recipient');

    const user = await factory.create('user');

    const token = user.generateToken();

    const { status } = await request(app)
      .put(`/recipients/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ state: '1' });

    expect(status).toBe(400);
  });

  it('should not be able update if recipient does not exist', async () => {
    await factory.create('recipient');

    const { zip_code } = await factory.attrs('recipient', {
      zip_code: '60176085',
    });

    const user = await factory.create('user', {
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    const recipientId = 'abc';
    const token = user.generateToken();

    const { status } = await request(app)
      .put(`/recipients/${recipientId}`)
      .send({ zip_code })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
  });
});

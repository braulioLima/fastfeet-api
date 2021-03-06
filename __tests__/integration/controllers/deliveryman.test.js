import request from 'supertest';
import '../../../src/bootstrap';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Deliveryman', () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
    await truncate();
  });

  it('should be able store deliveryman if logged', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const deliveryman = await factory.attrs('deliveryman');

    const { status, body } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not be able store deliveryman without token', async () => {
    const { status, body } = await request(app).post('/deliveryman');
    expect(status).toBe(401);
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Token not provided');
  });

  it('should not be store without required data', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { status } = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
  });

  it('should be able store deliveryman with avatar', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { body: file } = await request(app)
      .post('/files')
      .attach('file', '/home/braulio/Pictures/fastfeet.jpg')
      .set('Authorization', `Bearer ${token}`);

    const deliveryman = await factory.attrs('deliveryman', {
      avatar_id: file.id,
    });

    const { status, body } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should be return error if does not exist avatar', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const deliveryman = await factory.attrs('deliveryman', {
      avatar_id: 1,
    });

    const { status, body } = await request(app)
      .post('/deliveryman')
      .send(deliveryman)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.error).toBe('File does not exist');
  });

  it('should be able list deliverymans if authenticated', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { status } = await request(app)
      .get('/deliveryman')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('should be able remove deliverymans if authenticated', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { id } = await factory.create('deliveryman');

    const { status } = await request(app)
      .delete(`/deliveryman/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('should not be able remove if deliveryman does not exist', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { status, body } = await request(app)
      .delete(`/deliveryman/${1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.error).toBe('Deliveryman does not found');
  });

  it('should be able update deliverymans if authenticated', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { id } = await factory.create('deliveryman');

    const { status } = await request(app)
      .put(`/deliveryman/${id}`)
      .send({ email: 'teste@test.com' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('should not be able update deliverymans with incorrect data', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { id } = await factory.create('deliveryman');

    const { status, body } = await request(app)
      .put(`/deliveryman/${id}`)
      .send({ email: false })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.error).toBe('Validation fails');
  });

  it('should not be able update deliverymans if not exist', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    await factory.create('deliveryman');

    const { status, body } = await request(app)
      .put(`/deliveryman/${1000}`)
      .send({ email: 'teste@test.com' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.error).toBe('Deliveryman not found');
  });
});

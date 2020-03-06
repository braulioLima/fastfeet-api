import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Private routes', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able access recipient', async () => {
    const user = await factory.create('user');

    const token = user.generateToken();

    const { status } = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('should not be able access without a JWT', async () => {
    const { status } = await request(app).post('/recipients');

    expect(status).toBe(401);
  });

  it('should not be able to access private routes with invalid token jwt', async () => {
    const { status } = await request(app)
      .post('/recipients')
      .set('Authorization', 'Bearer test');

    expect(status).toBe(401);
  });
});

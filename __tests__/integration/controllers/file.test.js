import request from 'supertest';
import '../../../src/bootstrap';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('File', () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
    await truncate();
  });

  it('should be able store a file if logged', async () => {
    const user = await factory.create('user');

    const token = await user.generateToken();

    const { status, body } = await request(app)
      .post('/files')
      .attach('file', '/home/braulio/Pictures/fastfeet.jpg')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not be able store file without token', async () => {
    const { status, body } = await request(app).post('/files');
    expect(status).toBe(401);
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Token not provided');
  });
});

import '../../../src/bootstrap';
import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

describe('Private routes', () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
    await truncate();
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

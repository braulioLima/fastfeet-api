import '../../../src/bootstrap';
import supertest from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

let server;
let request;

describe('Private routes', () => {
  beforeEach(async () => {
    await truncate();
    server = await app.listen(process.env.SUPERTEST_PORT);
    request = supertest.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  it('should not be able access without a JWT', async () => {
    const { status } = await request.post('/recipients');

    expect(status).toBe(401);
  });

  it('should not be able to access private routes with invalid token jwt', async () => {
    const { status } = await request
      .post('/recipients')
      .set('Authorization', 'Bearer test');

    expect(status).toBe(401);
  });
});

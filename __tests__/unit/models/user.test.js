import bcrypt from 'bcryptjs';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User Model', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able store a user', async () => {
    const user = await factory.create('user');

    expect(user).toHaveProperty('id');
  });

  it('should be able encrypt user password on store', async () => {
    const { password_hash } = await factory.create('user', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', password_hash);

    expect(compareHash).toBe(true);
  });
});

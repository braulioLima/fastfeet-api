import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password_hash'],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = user.generateToken();

    const { id, name } = user;

    return res.status(201).json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new SessionController();

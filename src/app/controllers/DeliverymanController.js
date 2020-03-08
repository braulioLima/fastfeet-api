import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const { avatar_id } = req.body;

    if (avatar_id) {
      const file = await File.findByPk(avatar_id, {
        attributes: ['id'],
      });

      if (!file) {
        return res.status(400).json({ error: 'File does not exist' });
      }
    }

    const { id } = await Deliveryman.create(req.body);

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(201).send(deliveryman);
  }
}

export default new DeliverymanController();

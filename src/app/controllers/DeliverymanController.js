import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.status(201).send({ id, name, email, avatar_id });
  }
}

export default new DeliverymanController();

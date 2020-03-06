import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await Recipient.create(req.body);

    return res.status(201).send({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    });
  }
}

export default new RecipientController();

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

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.recipientId, {
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zip_code',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await recipient.update(req.body);

    return res.status(200).send({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });
  }
}

export default new RecipientController();

import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    street: Yup.string(),
    number: Yup.number()
      .positive()
      .min(1)
      .when('street', (street, field) => (street ? field.required() : field)),
    complement: Yup.string(),
    city: Yup.string(),
    state: Yup.string().matches(/^[a-zA-Z]{2}$/i),
    zip_code: Yup.string(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

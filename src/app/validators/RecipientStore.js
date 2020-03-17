import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    number: Yup.number()
      .positive()
      .min(1)
      .required(),
    complement: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip_code: Yup.string().required(),
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

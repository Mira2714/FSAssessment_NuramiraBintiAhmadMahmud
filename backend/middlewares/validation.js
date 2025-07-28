const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
  instructor_id: Joi.string().length(24).required(),
  status: Joi.string().valid('active', 'inactive').required().default('active'),
  image_url: Joi.string().uri().optional(),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log("inside validation file", error);
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
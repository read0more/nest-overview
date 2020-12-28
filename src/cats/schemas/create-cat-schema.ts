import * as Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

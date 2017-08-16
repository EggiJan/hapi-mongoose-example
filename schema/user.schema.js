import joi from 'joi';

export const User = joi.object().keys({
  name: joi.string().required()
}).description('User');
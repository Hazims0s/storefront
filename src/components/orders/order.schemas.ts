import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getOrderValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi
      .number()
      .required(),
  }).required(),
};

export const addOrderValidation: IValidationSchema = {
  body: Joi.object({
    product_id: Joi
      .number()
      .min(1)
      .required(),
    qty: Joi
      .number()
      .min(1)
      .required(),
    user_id: Joi
      .number()
      .min(1)
      .required(),
  }).required(),
};
import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getProductValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi
      .number()
      .required(),
  }).required(),
};

export const addProductValidation: IValidationSchema = {
  body: Joi.object({
    name: Joi
      .string()
      .min(2)
      .required(),
    price: Joi
      .number()
      .min(1)
      .required(),
  }).required(),
};
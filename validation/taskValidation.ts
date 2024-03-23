 import Joi from "joi";
// type objId= string
export const taskValiadtion =Joi.object({
    task:Joi.string()
    .alphanum()
    .min(5)
    .max(10)
    .required(),
    date:Joi.string()
    .min(8)
    .max(8)
    .default('today'),
    time:Joi.string()
    .min(3)
    .max(6)
    .default('12 am'),
    userId:Joi.required()

})

interface MyErrorMessages {
    'string.base': string;
    'string.min': string;
    'string.max': string;
    'string.email': string;
  }
  

  export const validationSchema: Joi.ObjectSchema<MyErrorMessages> = taskValiadtion.messages({
    'string.base': '{{#label}} must be a string',
    'string.min': '{{#label}} must be at least {{#limit}} characters long',
    'string.max': '{{#label}} cannot exceed {{#limit}} characters',
    'string.email': 'Please enter a valid email address',
  });
      
  
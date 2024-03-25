 import Joi from "joi";
// type objId= string
export const taskValiadtion =Joi.object({
    task:Joi.string()
    .alphanum()
    .min(5)
    .max(10)
    .required(),
    date: Joi.string().required().regex(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])$/), 
    time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), 
    userId:Joi.required()

})

interface MyErrorMessages {
    'string.base': string;
    'string.min': string;
    'string.max': string;
    'string.regex': string;
    
  }
  

  export const validationSchema: Joi.ObjectSchema<MyErrorMessages> = taskValiadtion.messages({
    'string.base': '{{#label}} must be a string',
    'string.min': '{{#label}} must be at least {{#limit}} characters long',
    'string.max': '{{#label}} cannot exceed {{#limit}} characters',
    'string.regex': 'Please enter a valid {{#label}} format',
  });
      
  
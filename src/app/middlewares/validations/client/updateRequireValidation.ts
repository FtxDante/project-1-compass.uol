import {NextFunction, Request, Response} from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
          .trim()
          .min(5)
          .max(50)
          .required(),
    });
    const {body} = req;
    const {error} = schema.validate(body, {abortEarly: false});
    if (error) throw error;
    next();
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
};

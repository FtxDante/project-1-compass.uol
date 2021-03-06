import {Request, Response} from 'express';
import {City} from '../interfaces/City';
import {serializePaginate, serializer} from '../serializer/citySerializer';
import CitiesService from '../services/CitiesService';

export default class CitiesController {
  static async postACity(req: Request, res: Response) {
    try {
      const {body} = req;
      const result = await CitiesService.create(body);
      return res.status(201).json(serializer(result));
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }

  static async getAllCities(req: Request, res: Response) {
    const result = await CitiesService.getAll(req.query);
    return res.status(200).json(serializePaginate(result));
  }

  static async findCity(req: Request, res: Response) {
    try {
      const {city, state}: City = req.query;
      const result = await CitiesService.findOne({city, state});
      return res.status(200).json(serializer(result));
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }

  static async deleteCity(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await CitiesService.delete(id);
      return res.status(204).end();
    } catch (err: any) {
      return res.status(err.statusCode).json({message: err.message});
    }
  }
}

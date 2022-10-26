import { Router } from 'express';
import UrlShortController from '@/controllers/urls.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PathCreationDto } from '@/dtos/url.dto';

class UrlShortRoute implements Routes {
  public path = '/';
  public router = Router();
  public urlsController = new UrlShortController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(PathCreationDto, 'body', true), this.urlsController.createByUrl);
    this.router.get(`${this.path}:path`, this.urlsController.getUrlByPath);
  }
}

export default UrlShortRoute;

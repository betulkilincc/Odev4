import { NextFunction, Request, Response } from 'express';
import UrlShortService from '@/services/urls.service';
import { PathCreationDto } from '@/dtos/url.dto';
import { Url } from '@/interfaces/urls.interface';

class UrlShortController {
  private urlService = new UrlShortService();

  public createByUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let urlData: PathCreationDto = req.body;

      let createUrlData: Url = await this.urlService.generatePathFromURl(urlData.url, urlData.customPath);

      res.status(200).json({ data: createUrlData, message: 'Path succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  public getUrlByPath = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let path: string = req.params.path as string;
      let url: string = await this.urlService.resolvePath(path);

      res.status(200).redirect(url);
    } catch (error) {
      next(error);
    }
  };
}

export default UrlShortController;

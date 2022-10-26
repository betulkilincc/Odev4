import { Url } from '@/interfaces/urls.interface';
import { HttpException } from '@exceptions/HttpException';
import urlModel from '@models/urls.model';
import { isEmpty } from '@utils/util';

class UrlShortService {
  public urls = urlModel;

  public async generatePathFromURl(sentUrl: string, path: string | undefined): Promise<Url> {
    if (isEmpty(sentUrl)) throw new HttpException(400, 'url is empty');

    let UrlExists: Url = this.urls.find((url: Url) => url.url === sentUrl);
    if (UrlExists) return UrlExists;
    if (path === undefined) {
      path = this.createPath();
    }
    while (this.urls.find((url: Url) => url.path === path)) {
      path = this.createPath();
    }
    let newUrl: Url = { path: path, url: sentUrl };
    this.urls = [...this.urls, newUrl];
    return newUrl;
  }
  public async resolvePath(path: string): Promise<string> {
    let findUrl: Url = this.urls.find((url: Url) => url.path === path);
    if (!findUrl) throw new HttpException(409, "Path doesn't exist");
    return findUrl.url;
  }
  createPath(): string {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export default UrlShortService;

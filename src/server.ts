import App from '@/app';
import UrlShortRoute from '@routes/url.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UrlShortRoute()]);

app.listen();

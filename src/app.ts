import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorMiddleware, loggerMiddleware } from './middleware';
import { RegisterRoutes } from '../tsoa/routes';
import swaggerDoc from '../tsoa/swagger.json';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

export const app = express();

// jsonパースの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// localhost:3000からのアクセスを許可
app.use(cors({ origin: 'http://localhost:3000' }));
// publicから静的ファイル読込
app.use(express.static('public'));

// ミドルウェアの登録
app.use(loggerMiddleware);
app.use(errorMiddleware);

// tsoaのルート設定
RegisterRoutes(app);

// swaggerUIの設定
const options: SwaggerOptions = {
  customCssUrl: ['/swaggerThemes/base.css', '/swaggerThemes/oneDark.css'], // themeの設定
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));

// ルートパス
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome');
});

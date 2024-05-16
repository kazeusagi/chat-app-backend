import { Request, Response, NextFunction } from 'express';

// ロギング用のミドルウェア
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url, 'called');
  next();
};

// エラーハンドリング用のミドルウェア
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Something broke!');
};

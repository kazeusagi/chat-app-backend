import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const openai = new OpenAI();
const prisma = new PrismaClient();

const app = express();
const port = 3333;

// jsonパースの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ミドルウェアの登録
const middleware = (req: any, res: any, next: any) => {
  console.log(req.method, req.url, 'called');
  next();
};
app.use(middleware);

// localhost:3000からのアクセスを許可
app.use(cors({ origin: 'http://localhost:3000' }));

// ルーティング
app.get('/', async (req: any, res: any) => {
  res.send('Welcome');
});

app.post('/aa', async (req: any, res: any) => {
  req.body;
  console.log(req.body.name);
  res.send(req.body.name);
});

app.post('/chat', async (req: any, res: any) => {
  const requestMessage = req.body.message;
  if (requestMessage == undefined) return;

  // openaiにリクエスト
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: requestMessage }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion);

  const responseMessage = completion.choices[0].message.content;
  // DBに保存
  const chat = await prisma.chat.create({});
  const message = await prisma.message.create({
    data: { content: responseMessage || '', chatId: chat.id },
  });

  res.send(message);
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

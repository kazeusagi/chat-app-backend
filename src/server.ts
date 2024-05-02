import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const openai = new OpenAI();
const prisma = new PrismaClient();

const app = express();
const port = 3333;

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
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });
});

app.post('/aa', async (req: any, res: any) => {
  req.body;
  res.send('a');
});

// app.post('/chat', async(req: any, res: any) => {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "みうく飲みたい" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
//   res.send(completion.choices[0].message.content)
// })

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import { app } from './app';

const port = 3333;

// サーバー起動
app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});

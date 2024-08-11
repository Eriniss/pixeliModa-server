import app from './app';

// 기본 포트 8080으로 설정
const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
  console.log(`${port} port's hot!`);
});

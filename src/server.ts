import app from './app';

const port = app.get('port') || process.env.PIXELIMODA_SERVER_PORT || 8080;

app.listen(port, () => {
  console.log(`${port} port's hot!`);
});

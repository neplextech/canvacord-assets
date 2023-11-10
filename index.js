process.env.NODE_ENV ??= 'production';

import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('x-neplex-ts', String(Date.now()));
  res.setHeader('x-neplex-pid', String(process.pid));

  next();
});

app.use(express.static('public'));

app.all('*', (req, res) => {
  res.status(403).send({
    status: 'error',
    message: 'Forbidden',
  });
});

app.listen(PORT, () => {
  console.log('Server started on port *:' + PORT);
});

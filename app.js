const express = require('express');

const app = express();
const port = process.env.port || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
  .get((req, res) => {
    const responseJson = { hello: 'This is my api' };
    res.json(responseJson);
  });
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my api.');
});

app.listen(port, () => {
  console.log(`Gulp is running on port: ${port}`);
});

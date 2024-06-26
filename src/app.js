const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

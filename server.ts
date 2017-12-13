import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const app = express();
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// QUERIES
app.get('/api/accounts', (req, res) => {
  const param = req.query.q;
  console.log(param);
});

app.get('*', (req, res) => {
  console.log('Not found, send error');
  // TODO;
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

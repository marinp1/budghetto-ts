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
app.get('/api/:userId/accounts',(
  req: express.Request,
  res: express.Response) => {
  const userId = req.params.userId;
  res.send('user ' + userId);
});

app.get('*', (req: express.Request,
              res: express.Response) => {
  send404Response(res);
});

function send404Response(res: express.Response) {
  res.send('404 - not found');
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

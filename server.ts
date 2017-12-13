import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { getModels, IModels } from './models';

const app = express();
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// DATABASE INIT

interface IdatabaseResult {
  sequelize: Sequelize.Sequelize;
  models: IModels;
}

function initDatabase(dbFilePath: string = path.join(__dirname, './db.sqlite')): IdatabaseResult {
  const sequelize = new Sequelize('sequelize', '', '', {
    dialect: 'sqlite',
    storage: dbFilePath,
    logging: false,
  });
  const models = getModels(sequelize);
  return {
    sequelize,
    models,
  };
}

/* tslint:disable */
let db = initDatabase();
/* tslint:enable */

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

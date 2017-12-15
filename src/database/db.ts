import 'rxjs';
import 'babel-polyfill';
import * as rxdb from 'rxdb';
import { userSchema, accountSchema } from './schemas';

rxdb.plugin(require('pouchdb-adapter-memory'));

let database: rxdb.RxDatabase;
export let users: rxdb.RxCollection<any>;
export let accounts: rxdb.RxCollection<any>;

export async function createDatabase() {
  const db = await rxdb.create({
    name: 'budghettodb',
    adapter: 'memory',
  });

  db.waitForLeadership().then(() => {
    document.title = '♛ ' + document.title;
  });

  users = await db.collection({ name: 'users', schema: userSchema });
  accounts = await db.collection({ name: 'accounts', schema: accountSchema });

  /*
  // TODO: Don't create any accounts here
  accounts.insert({
    id:'Nordea-Nordea',
    name: 'Nordea',
    bankName: 'Nordea',
    colour: '#0000FF',
    startingBalance: 43200,
    initiationDate: '2017-08-06',
    currencyType: 'EUR',
  });
  */

  database = db;

  return true;
}

export function exportDatabase() {
  database.dump()
    .then(json => console.dir(json));
}

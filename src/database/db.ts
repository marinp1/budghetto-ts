import 'rxjs';
import 'babel-polyfill';
import * as rxdb from 'rxdb';
import { userSchema, accountSchema } from './schemas';

rxdb.plugin(require('pouchdb-adapter-memory'));

let database: rxdb.RxDatabase;
let users: rxdb.RxCollection<any>;
let accounts: rxdb.RxCollection<any>;

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

  database = db;

  return true;
}

export function exportDatabase() {
  database.dump()
    .then(json => console.dir(json));
}

export function getUsers() {
  console.log(users);
}

export function getAccounts() {
  console.log(accounts);
}

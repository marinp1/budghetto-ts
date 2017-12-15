import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createDatabase } from './database/db';

createDatabase().then((res) => {
  // TODO: Check if database creation failed
  ReactDOM.render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement,
  );
  registerServiceWorker();
});

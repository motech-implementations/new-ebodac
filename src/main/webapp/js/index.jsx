import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-cycle
import authenticateToken from './components/auth/authenticate-token';

import App from './components/app';
import Store from './store';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

authenticateToken();

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

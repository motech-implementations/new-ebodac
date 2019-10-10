import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
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
    <Alert
      timeout="none"
      stack={{ limit: 3 }}
      offset={29.5}
      html
      position="top-right"
      effect="bouncyflip"
    />
  </Provider>,
  document.getElementById('root'),
);

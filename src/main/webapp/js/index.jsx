import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

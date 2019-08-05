import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.scss';

import Navbar from './navbar';
import loadIcons from './icon-loader';

loadIcons();

export default () => (
  <div>
    <Navbar />
  </div>
);

import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import rootReducer from './reducers/index';

const offlineEnhancer = createOffline(offlineConfig);

const store = createStore(
  offlineEnhancer.enhanceReducer(rootReducer),
  compose(
    offlineEnhancer.enhanceStore,
    applyMiddleware(offlineEnhancer.middleware, reduxThunk, ReduxPromise),
  ),
);

export default store;

import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import {RootReducer} from './RootReducer';

export default function configureStore(preloadedState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(RootReducer,
        composeEnhancers(applyMiddleware(thunk)));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        // module.hot.accept('../reducers', () => {
        //   const nextReducer = require('../reducers').default
        //   store.replaceReducer(nextReducer)
        // })
    }

    return store;
}

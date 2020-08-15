import './ressources/style/bootstrap.css';

import * as es6Promise from 'es6-promise';
import * as moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import {MyRouter} from './pages/router/RouteContainer';
import configureStore from './util/store/configureStore';
import { RootReducer } from './util/store/RootReducer';

import Keycloak from 'keycloak-js';


es6Promise.polyfill();

const objectAssign = require('object-assign');
// import 'bootstrap/less/bootstrap.less';
// let deLocale = require('moment/locale/de');
moment.locale('de');

const store = configureStore(RootReducer);

if (!Object.assign) {
    Object.assign = objectAssign;
}

if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function(value) {
            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            let O = Object(this);

            // Steps 3-5.
            let len = O.length >>> 0;

            // Steps 6-7.
            let start = arguments[1];
            let relativeStart = start >> 0;

            // Step 8.
            let k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            let end = arguments[2];
            let relativeEnd = end === undefined ?
                len : end >> 0;

            // Step 11.
            let final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        },
    });
}


export const CHANGE_KEYCLOAK_INSTANCE = 'CHANGE_KEYCLOAK_INSTANCE';


const keycloak = Keycloak();
keycloak.init({ onLoad: 'login-required' })
    .success(() => {
        console.log('jojo, hat geklappt' + keycloak);
        
        store.dispatch(
            {
                data: { ...keycloak },
                type: CHANGE_KEYCLOAK_INSTANCE
            });

    })
    .error((error) => console.log('Hier ist was schief gelaufen: ' + error));


ReactDOM.render(
    <Provider store={store}>
        <MyRouter />
    </Provider>,
    document.getElementById('root')
);
import * as React from 'react';

import { clone } from '../../util/store/ObjectUtils';
import { App } from '../main/App';
import { DashboardView } from '../view_dashboard/DashboardContainer';
import { DayViewView } from '../view_dayview/DayViewContainer';
import { InfluxDBView } from '../view_influxdb/InfluxDBContainer';
import { MonthViewView } from '../view_monthview/MonthViewContainer';
import { CHANGE_PAGE_TITLE } from './RouteContainer';

export interface IRegisteredPagesInterface {
    component: React.Component | any;
    path: string;
    showIn: string;
    title: string;
}

export interface IRouteStore {
    mainPage: IRegisteredPagesInterface;
    registeredPages: IRegisteredPagesInterface[];
    titleActivePage: string;
    keycloakInformations: Keycloak.KeycloakInstance ;
    token: string;
}

const initialState: IRouteStore = {
    mainPage: {
        component: App,
        path: '/app',
        showIn: '',
        title: 'App',
    },
    registeredPages: [{
        component: DashboardView,
        path: '/app/dashBoard',
        showIn: 'sidebar',
        title: 'DashBoard',
    }, {
        component: MonthViewView,
        path: '/app/monatsansicht',
        showIn: 'sidebar',
        title: 'Monatsansicht',
    }, {
        component: DayViewView,
        path: '/app/tagesansicht',
        showIn: 'sidebar',
        title: 'Tagesansicht',
    }, {
        component: InfluxDBView,
        path: '/app/influxdb',
        showIn: 'sidebar',
        title: 'InfluxDB',
    }],
    titleActivePage: '',
    keycloakInformations: undefined,
    token: undefined,
};

export function RouteReducer(state: IRouteStore = initialState, action: any) {

    const clonedState = clone(state);
    switch (action.type) {
        case CHANGE_PAGE_TITLE:
            clonedState.titleActivePage = action.data;
            return clonedState;
    }
    return state;
}

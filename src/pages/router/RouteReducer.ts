import * as React from 'react';

import { clone } from '../../util/store/ObjectUtils';
import { App } from '../main/App';
import { DashboardView } from '../view_dashboard/DashboardContainer';
import { DayViewView } from '../view_dayview/DayViewContainer';
import { MonthViewView } from '../view_monthview/MonthViewContainer';
import { CHANGE_PAGE_TITLE } from './RouteContainer';

interface IRegisteredPagesInterface {
    component: React.Component | any;
    path: string;
    showIn: string;
    title: string;
}

export interface IRouteStore {
    mainPage: {
        component: React.Component | any,
        path: string,
        showIn: string,
        title: string,
    };
    registeredPages: IRegisteredPagesInterface[]
    ;
    titleActivePage: string;
}

const initialState: IRouteStore = {
    mainPage: {
        component: App,
        path: '/',
        showIn: '',
        title: 'App',
    },
    registeredPages: [{
        component: DashboardView,
        path: '/dashBoard',
        showIn: 'sidebar',
        title: 'DashBoard',
    }, {
        component: MonthViewView,
        path: '/monatsansicht',
        showIn: 'sidebar',
        title: 'Monatsansicht',
    }, {
        component: DayViewView,
        path: '/tagesansicht',
        showIn: 'sidebar',
        title: 'Tagesansicht',
    }],
    titleActivePage: '',
};

export function RouteReducer(state: IRouteStore = initialState, action: any) {
    switch (action.type) {
        case CHANGE_PAGE_TITLE:
            const clonedState = clone(state);
            clonedState.titleActivePage = action.data;
            return clonedState;
    }
    return state;
}

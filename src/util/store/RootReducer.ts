import { combineReducers } from 'redux';

import { AlertReducer } from '../../pages/alerts/AlertReducer';
import { RouteReducer } from '../../pages/router/RouteReducer';
import { SideBarReducer } from '../../pages/sidebar/SideBarReducer';
import { DashboardReducer } from '../../pages/view_dashboard/DashboardReducer';
import { DayViewReducer } from '../../pages/view_dayview/DayViewReducer';
import { MonthViewReducer } from '../../pages/view_monthview/MonthViewReducer';

export const ROOT_REDUCER_LOGOUT = 'USER_LOGOUT';

const AppReducer = combineReducers(
    {
        routeReducer: RouteReducer,
        sideBarReducer: SideBarReducer,
        alertReducer: AlertReducer,
        dashboardReducer: DashboardReducer,
        dayViewReducer: DayViewReducer,
        monthViewReducer: MonthViewReducer,
    });

export const RootReducer = (state: any, action: any) => {
    if (action.type === ROOT_REDUCER_LOGOUT) {
        state = undefined;
    }
    return AppReducer(state, action);
};

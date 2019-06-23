import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRouteStore } from './RouteReducer';
import { IRouteProperties, MyRouterPlane } from './RouteView';

export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';

function mapStateToProps(state: { routeReducer: IRouteStore }): IRouteProperties {
    return {
        history: {},
        routeStore: state.routeReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IRouteProperties>): {} {
    return {};
}

export const MyRouter: any = connect(mapStateToProps, mapDispatchToProps)(MyRouterPlane);

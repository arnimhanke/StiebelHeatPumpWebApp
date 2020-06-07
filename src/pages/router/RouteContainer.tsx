import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ILoginStore, LoginReducer } from '../main/LoginReducer';
import { IRouteStore } from './RouteReducer';
import { IRouteActions, IRouteProperties, MyRouterPlane } from './RouteView';

export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';

function mapStateToProps(state: { routeReducer: IRouteStore, loginReducer: ILoginStore }): IRouteProperties {
    return {
        history: {},
        routeStore: state.routeReducer,
        keycloakInformations: state.loginReducer.keycloakInformations,

    };
}

function mapDispatchToProps(dispatch: Dispatch<IRouteProperties>): IRouteActions {
    return {
    };
}

export const MyRouter: any = connect(mapStateToProps, mapDispatchToProps)(MyRouterPlane);

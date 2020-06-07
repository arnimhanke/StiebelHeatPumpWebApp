import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppStore, IAppViewProperties } from '../main/App';
import { ILoginStore } from '../main/LoginReducer';
import { IRouteStore } from '../router/RouteReducer';
import { IRouteProperties } from '../router/RouteView';
import { InfluxDBView_Plain } from './InfluxDBView';

export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';
export const CHANGE_KEYCLOAK_INSTANCE = 'CHANGE_KEYCLOAK_INSTANCE';

function mapStateToProps(state: { loginReducer: ILoginStore }): IAppViewProperties {
    return {
        registeredPages: [],
        titleActivePage: '',
        keycloakInformations: state.loginReducer.keycloakInformations,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IRouteProperties>): {} {
    return {};
}

export const InfluxDBView: any = connect(mapStateToProps, mapDispatchToProps)(InfluxDBView_Plain);

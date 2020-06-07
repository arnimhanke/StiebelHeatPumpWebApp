import '../../ressources/style/griddle.css';

import * as React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import * as Keycloak from 'keycloak-js';
import { clone } from '../../util/store/ObjectUtils';
import { AlertComponent } from '../alerts/AlertComponent';
import { Header } from '../common/Header';
import { IRouteStore } from '../router/RouteReducer';
import { ILoginStore } from './LoginReducer';

export interface IAppViewProperties {
    registeredPages: any;
    titleActivePage: string;
    keycloakInformations: Keycloak.KeycloakInstance;
}

type ComponentProps = IAppViewProperties & {};

export class AppPlain extends React.Component<ComponentProps, {}> {

    public shouldComponentUpdate(nextProps: ComponentProps, nextState: any) {
        // if (nextProps.appStore.keycloakInformations != undefined && this.props.appStore.keycloakInformations == undefined) {
        //     return false;
        // }

        // if (nextProps.appStore.keycloakInformations != undefined && this.props.appStore.keycloakInformations != undefined
        //     && nextProps.appStore.keycloakInformations.token != this.props.appStore.keycloakInformations.token) {
        //     return false;
        // }

        return true;
    }

    public render() {
        return (
            <div>
                <Header />
                <AlertComponent />
                <Grid style={{ margin: '0px', width: '100%' }} className={'mainContainer lowerContainer'}>
                    <div id='pageContent'>
                        {this.props.registeredPages.map((registeredPage: any) =>
                            <Route key={registeredPage.path} path={registeredPage.path} component={registeredPage.component} />,
                        )}
                    </div>
                </Grid>
            </div>

        );

    }
}

export interface IAppStore {
    keycloakInformations: Keycloak.KeycloakInstance;
}

function mapStateToProps(state: { routeReducer: IRouteStore, loginReducer: ILoginStore }): IAppViewProperties {
    return {
        titleActivePage: state.routeReducer.titleActivePage,
        registeredPages: state.routeReducer.registeredPages,
        keycloakInformations: state.loginReducer.keycloakInformations,
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>): {} {
    return {

    };
}

const initialState: IAppStore = {
    keycloakInformations: null,
};

// export function AppViewReducer(state: IAppStore = initialState, action: any) {
//     switch (action.type) {
//         case CHANGE_KEYCLOAK_INSTANCE:
//             const clonedState = clone(state);
//             clonedState.keycloakInformations = action.data;
//             return clonedState;
//     }
//     return state;
// }

export const App: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

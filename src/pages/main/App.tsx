import '../../ressources/style/griddle.css';

import * as React from 'react';
import Grid from 'react-bootstrap/Container';
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
        if (nextProps.keycloakInformations !== undefined && this.props.keycloakInformations == undefined) {
            return false;
        }

        if (nextProps.keycloakInformations !== undefined && this.props.keycloakInformations !== undefined
            && nextProps.keycloakInformations.token !== this.props.keycloakInformations.token) {
            return false;
        }

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

export const App: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { IRegisteredPagesInterface, IRouteStore } from './RouteReducer';

export interface IRouteProperties {
    history: any;
    routeStore: IRouteStore;
    keycloakInformations: Keycloak.KeycloakInstance;
}

export interface IRouteActions {

}

type ComponentProps = IRouteProperties & IRouteActions;

export class MyRouterPlane extends React.Component<ComponentProps, {}> {

    constructor(props: ComponentProps, state: {}) {
        super(props, state);
    }

    public shouldComponentUpdate(nextProps: IRouteProperties, nextState: any) {
        if (nextProps.keycloakInformations != undefined && this.props.keycloakInformations == undefined) {
            return true;
        }

        if (nextProps.keycloakInformations != undefined && this.props.keycloakInformations != undefined
            && nextProps.keycloakInformations.token != this.props.keycloakInformations.token) {
            return true;
        }

        return false;
    }

    public render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route exact key={this.props.routeStore.loginPage.path}
                                path={this.props.routeStore.loginPage.path}
                                component={this.props.routeStore.loginPage.component}></Route>
                            <PrivateRoute key={this.props.routeStore.mainPage.path}
                                path={this.props.routeStore.mainPage.path}
                                isAuth={this.props.keycloakInformations != undefined}
                                redirectPath={this.props.routeStore.loginPage.path}
                                component={this.props.routeStore.mainPage.component}>
                            </PrivateRoute>

                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }

    protected refreshData() { }
}

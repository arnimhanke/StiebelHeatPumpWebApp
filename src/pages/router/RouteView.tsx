import * as React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

// import { PrivateRoute } from './PrivateRoute';
import { PrivateRoute } from './PrivateRoute';
import { IRouteStore } from './RouteReducer';

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

    public handleRefresh(token: any) {
        console.log('Called every time the token is refreshed so you can update it locally', token);
    }

    public render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Switch>
                            <PrivateRoute key={this.props.routeStore.mainPage.path}
                                path={this.props.routeStore.mainPage.path}
                                isAuth={this.props.keycloakInformations != undefined}
                                redirectPath={'/'}
                                component={this.props.routeStore.mainPage.component}>
                            </PrivateRoute>
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

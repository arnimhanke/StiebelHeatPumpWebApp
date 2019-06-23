import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { IRouteStore } from './RouteReducer';

export interface IRouteProperties {
    history: any;
    routeStore: IRouteStore;
}

type ComponentProps = IRouteProperties & {};

export class MyRouterPlane extends React.Component<ComponentProps, {}> {

    constructor(props: ComponentProps, state: {}) {
        super(props, state);
    }

    public shouldComponentUpdate(nextProps: IRouteProperties, nextState: any) {
        return false;
    }

    public render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route key={this.props.routeStore.mainPage.path}
                                path={this.props.routeStore.mainPage.path}
                                component={this.props.routeStore.mainPage.component}>
                            </Route>
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }

    protected refreshData() {}
}

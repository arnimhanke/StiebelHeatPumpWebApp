import '../../ressources/style/griddle.css';

import * as React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { AlertComponent } from '../alerts/AlertComponent';
import { Header } from '../common/Header';
import { IRouteStore } from '../router/RouteReducer';

export interface IAppViewProperties {
    registeredPages: any;
    titleActivePage: string;
}

export interface IAppViewActions {
    actions: {
    };
}

type ComponentProps = IAppViewProperties & IAppViewActions;

export class AppPlain extends React.Component<ComponentProps, {}> {
    public render() {
        return (
            <div>
                <Header/>
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

function mapStateToProps(state: { routeReducer: IRouteStore }): IAppViewProperties {
    return {
        titleActivePage: state.routeReducer.titleActivePage,
        registeredPages: state.routeReducer.registeredPages,
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>): IAppViewActions {
    return {
        actions: bindActionCreators({
        }, dispatch),
    };
}

export const App: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(AppPlain);

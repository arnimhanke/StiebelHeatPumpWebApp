import '../../ressources/style/sidemenu.css';

import * as React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import { IRouteStore } from '../router/RouteReducer';
import { ISidebarAction } from './SideBarActions';
import { ISideBarStore } from './SideBarReducer';

export interface ISideBarActions {
    actions: {
        closeSidebar: () => ISidebarAction,
    };
}

export interface ISideBarProperties {
    history: any;
    sidebarStore: ISideBarStore;
    routeStore: IRouteStore;
}

type ComponentProps = ISideBarProperties & ISideBarActions;

export class SidebarPlane extends React.Component<ComponentProps, {}> {

    constructor(props: ComponentProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    public render(): JSX.Element {
        return (
            <Menu isOpen={this.props.sidebarStore.isOpen}>
                {this.props.routeStore.registeredPages.map((registeredPage) =>
                    registeredPage.showIn === 'sidebar' ?
                        <Link className={'navItem'} onClick={this.onClick} key={registeredPage.path} to={registeredPage.path}>{registeredPage.title}</Link> : '',
                )}
            </Menu>
        );
    }

    private onClick() {
        this.props.actions.closeSidebar();
    }
}

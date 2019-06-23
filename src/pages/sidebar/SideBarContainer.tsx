import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IRouteStore } from '../router/RouteReducer';
import { onCloseSidebar } from './SideBarActions';
import { ISideBarStore } from './SideBarReducer';
import { ISideBarActions, ISideBarProperties, SidebarPlane } from './SidebarView';

export const CLOSE_SIDEBAR = 'close_sidebar';

function mapStateToProps(state: { sideBarReducer: ISideBarStore, routeReducer: IRouteStore }): ISideBarProperties {
    return {
        history: {},
        routeStore: state.routeReducer,
        sidebarStore: state.sideBarReducer,

    };
}

function mapDispatchToProps(dispatch: Dispatch<ISideBarProperties>): ISideBarActions {
    return {
        actions: bindActionCreators({
            closeSidebar: onCloseSidebar,
        }, dispatch),
    };
}

export const Sidebar: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(SidebarPlane);

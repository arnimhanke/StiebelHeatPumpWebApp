import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { onGetDataForDashboard } from './DashboardAction';
import { IDashboardStore } from './DashboardReducer';
import { DashboardPlain, IDashboardActions, IDashboardProperties } from './DashboardView';

export const DASCHBOARD_VIEW_DATA = 'DASCHBOARD_VIEW_DATA';

function mapStateToProps(state: { dashboardReducer: IDashboardStore }): IDashboardProperties {
    return {
        dashboardStore: state.dashboardReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDashboardProperties>): IDashboardActions {
    return {
        actions: bindActionCreators({
            getDataForDashboard: onGetDataForDashboard,
        }, dispatch),
    };
}

export const DashboardView: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(DashboardPlain);

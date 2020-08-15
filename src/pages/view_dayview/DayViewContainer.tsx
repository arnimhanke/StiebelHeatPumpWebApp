import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ILoginStore } from '../main/LoginReducer';
import { onGetDataForDayView, onGetTimeseriesForDayView } from './DayViewAction';
import { IDayViewStore } from './DayViewReducer';
import { DayViewPlain, IDayViewActions, IDayViewProperties } from './DayViewView';

export const DAYVIEW_DATA = 'DAYVIEW_DATA';
export const DAYVIEW_DATA_TIMESERIES = 'DAYVIEW_DATA_TIMESERIES';

function mapStateToProps(state: { dayViewReducer: IDayViewStore, loginReducer: ILoginStore }): IDayViewProperties {
    return {
        DayViewStore: state.dayViewReducer,
        keycloakInformations: state.loginReducer.keycloakInformations,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDayViewProperties>): IDayViewActions {
    return {
        actions: bindActionCreators({
            getDataForDayView: onGetDataForDayView,
            getTimeseriesForDayView: onGetTimeseriesForDayView,
        }, dispatch),
    };
}

export const DayViewView: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(DayViewPlain);

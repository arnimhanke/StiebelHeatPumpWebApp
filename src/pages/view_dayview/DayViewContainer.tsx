import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { onGetDataForDayView } from './DayViewAction';
import { IDayViewStore } from './DayViewReducer';
import { DayViewPlain, IDayViewActions, IDayViewProperties } from './DayViewView';

export const DAYVIEW_DATA = 'DAYVIEW_DATA';

function mapStateToProps(state: { dayViewReducer: IDayViewStore }): IDayViewProperties {
    return {
        DayViewStore: state.dayViewReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDayViewProperties>): IDayViewActions {
    return {
        actions: bindActionCreators({
            getDataForDayView: onGetDataForDayView,
        }, dispatch),
    };
}

export const DayViewView: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(DayViewPlain);

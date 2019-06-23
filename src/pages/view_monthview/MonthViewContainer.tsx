import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { onGetDataForMonthView } from './MonthViewAction';
import { IMonthViewStore } from './MonthViewReducer';
import { IMonthViewActions, IMonthViewProperties, MonthViewPlain } from './MonthViewView';

export const MONTH_VIEW_DATA = 'MONTH_VIEW_DATA';
export const MONTH_VIEW_DATA_INTERPRET = 'MONTH_VIEW_DATA_INTERPRET';

function mapStateToProps(state: { monthViewReducer: IMonthViewStore }): IMonthViewProperties {
    return {
        monthViewStore: state.monthViewReducer,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IMonthViewProperties>): IMonthViewActions {
    return {
        actions: bindActionCreators({
            getDataForMonthView: onGetDataForMonthView,
        }, dispatch),
    };
}

export const MonthViewView: React.ReactNode = connect(mapStateToProps, mapDispatchToProps)(MonthViewPlain);

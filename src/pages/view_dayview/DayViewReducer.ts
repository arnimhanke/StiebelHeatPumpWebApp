import * as moment from 'moment';

import { Interval } from '../../objects/Intervals';
import { MonthViewDataDto } from '../../objects/MonthViewDateDto';
import { ValueDto } from '../../objects/ValueDto';
import {cloneObject} from '../../util/store/ObjectUtils';
import { HighcartsSeries } from '../common/HIghcharts/HighchartsSeries';
import {IDispatchObjectExternData, IDispatchObjectInternData} from '../common/RequestHelper';
import { preparingDataForFurtherUse } from '../common/SeriesActions';
import { DAYVIEW_DATA } from './DayViewContainer';

export interface IDayViewStore {
    selectedDate: moment.Moment;
    series: HighcartsSeries[];
}

const initialState: IDayViewStore = {
    selectedDate: moment(),
    series: [],
};

export function DayViewReducer(state: IDayViewStore = initialState, action: IDispatchObjectExternData & IDispatchObjectInternData) {

    switch (action.type) {
        case DAYVIEW_DATA:
            const clonedState: IDayViewStore = cloneObject(state);
            const data: MonthViewDataDto = action.rootData;
            const optionalData = action.optionalData;

            // Gleich dem Abfragezeitraum
            const start = moment(optionalData.fromDateAsString);
            const end = moment(optionalData.toDateAsString).subtract(1, 'd');

            const preparedData = preparingDataForFurtherUse(data.values, start, end, Interval.PT15_SEC);

            console.log(preparedData);
            clonedState.series = generateHighchartsSeries(preparedData);
            return clonedState;
    }

    return state;
}

function generateHighchartsSeries(data: {[key: string]: ValueDto[]}): HighcartsSeries[] {
    const ret: HighcartsSeries[] = [];

    for (const key in data) {
        if (data[key] != undefined) {
            const series = new HighcartsSeries();
            if (data[key].length > 0) {
                series.pointStart = data[key][0].date;
                series.pointInterval = 15 * 1000;
                series.name = key;
                ret.push(series);
            }
            for (let i = 0; i < data[key].length; i++) {
                series.data.push(Number.parseFloat(data[key][i].value));
            }
        }
    }

    return ret;
}

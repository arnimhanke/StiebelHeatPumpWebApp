import * as moment from 'moment';

import { Interval } from '../../objects/Intervals';
import { MonthViewDataDto } from '../../objects/MonthViewDateDto';
import { ValueDto } from '../../objects/ValueDto';
import { cloneObject } from '../../util/store/ObjectUtils';
import { Timeseries, TimeSeriesRaster, TimeSeriesUnit, TimeSeriesValue } from '../../util/tsts';
import { HighcartsSeries } from '../common/HIghcharts/HighchartsSeries';
import { IDispatchObjectExternData, IDispatchObjectInternData } from '../common/RequestHelper';
import { preparingDataForFurtherUse } from '../common/SeriesActions';
import { DAYVIEW_DATA, DAYVIEW_DATA_TIMESERIES } from './DayViewContainer';

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
            const clonedState1: IDayViewStore = cloneObject(state);
            const data: MonthViewDataDto = action.rootData;
            const optionalData = action.optionalData;

            // Gleich dem Abfragezeitraum
            const start = moment(optionalData.fromDateAsString);
            const end = moment(optionalData.toDateAsString).subtract(1, 'd');

            const preparedData = preparingDataForFurtherUse(data.values, start, end, Interval.PT15_SEC);

            console.log(preparedData);
            clonedState1.series = generateHighchartsSeries(preparedData);
            return clonedState1;
        case DAYVIEW_DATA_TIMESERIES:
            const clonedState2: IDayViewStore = cloneObject(state);
            console.log(action.rootData);
            const ts: Timeseries = action.rootData;
            clonedState2.series = [];
            clonedState2.series.push(generateHighchartsSeriesFromTimeseries(ts));
            console.log(clonedState2);
            return clonedState2;
    }

    return state;
}

function generateHighchartsSeriesFromTimeseries(ts: Timeseries): HighcartsSeries {

    const series = new HighcartsSeries();
    const sortedList: TimeSeriesValue[] = ts.timeSeriesValues.sort((a: TimeSeriesValue, b: TimeSeriesValue) => moment(a.time).isBefore(moment(b.time)) ? 1 : 0);
    series.data = sortedList.map((value) => value.value);
    series.name = ts.timeSeriesHead.tsId;
    series.pointStart = moment(sortedList[0].time).valueOf();
    series.pointInterval = getNumberOfSecondsFromTimeSeriesRaster(ts.timeSeriesHead.tsRaster);

    return series;
}

function getNumberOfSecondsFromTimeSeriesRaster(timeseriesRaster: TimeSeriesRaster): number {
    switch (timeseriesRaster) {
        case TimeSeriesRaster.P1D:
            return 24 * 60 * 60;
        case TimeSeriesRaster.PT15M:
            return 15 * 60;
        case TimeSeriesRaster.PT1H:
            return 60 * 60;
        case TimeSeriesRaster.PT15S:
            return 15;

    }
}

function generateHighchartsSeries(data: { [key: string]: ValueDto[] }): HighcartsSeries[] {
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

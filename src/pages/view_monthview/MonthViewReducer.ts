import * as moment from 'moment';

import { Interval } from '../../objects/Intervals';
import { MonthViewDataDto } from '../../objects/MonthViewDateDto';
import { ValueDto } from '../../objects/ValueDto';
import { cloneObject } from '../../util/store/ObjectUtils';
import { GriddleTableValueDto } from '../common/GriddleTable/GriddleTableValueDto';
import { IDispatchObjectExternData, IDispatchObjectInternData } from '../common/RequestHelper';
import { preparingDataForFurtherUse } from '../common/SeriesActions';
import { MONTH_VIEW_DATA, MONTH_VIEW_DATA_INTERPRET } from './MonthViewContainer';

export interface IMonthViewStore {
    columns: string[];
    selectedDate: moment.Moment;
    startDate: moment.Moment;
    valuesForMonthView: Array<{[key: string]: GriddleTableValueDto}>;
    valuesNotInterpreted: MonthViewDataDto;
}

const initialState: IMonthViewStore = {
    columns: undefined,
    selectedDate: moment(),
    startDate: moment(),
    valuesForMonthView: undefined,
    valuesNotInterpreted: undefined,
};

export function MonthViewReducer(state: IMonthViewStore = initialState, action: IDispatchObjectExternData & IDispatchObjectInternData) {
    switch (action.type) {
        case MONTH_VIEW_DATA:
            const clonedState: IMonthViewStore = cloneObject(state);
            const data: MonthViewDataDto = action.rootData;
            clonedState.valuesNotInterpreted = data;
            const optionalData = action.optionalData;

            // Gleich dem Abfragezeitraum
            const start = moment(optionalData.fromDateAsString);
            const end = moment(optionalData.toDateAsString).subtract(1, 'd');

            // const preparedData = preparingDataForFurtherUse(data.values, start, end, Interval.PT1_DAY);

            const reinterpretedData = reinterpreteDataAndAddTimeStamps(data.values, data.displayedNames);
            clonedState.valuesForMonthView = reinterpretedData.values;
            clonedState.columns = reinterpretedData.cols;
            clonedState.startDate = moment(optionalData.toDateAsString);
            return clonedState;
    }
    return state;
}

function reinterpreteDataAndAddTimeStamps(data: {[key: string]: ValueDto[]}, displayedNames: {[key: string]: string}):
                                                {values: Array<{[key: string]: GriddleTableValueDto}>, cols: string[]} {
    console.log('Start reinterprete Data');
    const retValues: Array<{[key: string]: GriddleTableValueDto}> = new Array<{[key: string]: GriddleTableValueDto}>();
    const keys: string[] = [];

    for (const key in data) {
        if (data[key] !== undefined) {
            keys.push(key);
        }
    }

    const length = data[keys[0]].length;

    for (let i = 0; i < length; i++) {
        const obj: any = {};
        const timeKey = 'Uhrzeit';
        obj[timeKey] = new GriddleTableValueDto('', '', moment(data[keys[0]][i].date).format('DD.MM.YYYY'));

        for (const key in keys) {
            if (data[keys[key]] !== undefined && data[keys[key]][i] !== undefined) {
                const value = data[keys[key]][i].value;
                obj[displayedNames[keys[key]]] = new GriddleTableValueDto('', 'number', value);
            }
        }
        retValues.push(obj);
    }
    const retCols = [];
    retCols.push('Uhrzeit');

    for (const key in keys) {
        if (data[keys[key]] !== undefined) {
            retCols.push(displayedNames[keys[key]]);
        }
    }

    const ret = {
        cols: retCols,
        values: retValues,
    };

    return ret;
}

function printValueDtos(data: {[key: string]: ValueDto[]}) {
    for (const key in data) {
        console.log(key);
        const vals: ValueDto[] = data[key];
        for (let i = 0; i < vals.length; i++) {
            console.log(moment(vals[i].date).toLocaleString(), vals[i].value);
        }
    }
}

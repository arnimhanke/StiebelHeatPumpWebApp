import moment from 'moment';

import {DashBoardObject} from '../../objects/DashBoardObjects';
import {cloneObject} from '../../util/store/ObjectUtils';
import {IDispatchObjectExternData, IDispatchObjectInternData} from '../common/RequestHelper';
import { DASCHBOARD_VIEW_DATA } from './DashboardContainer';

export interface IDashboardStore {
    data: DashBoardObject[];
    selectedDate: moment.Moment;
}

const initialState: IDashboardStore = {
    data: [],
    selectedDate: moment(),
};

export function DashboardReducer(state: IDashboardStore = initialState, action: IDispatchObjectExternData & IDispatchObjectInternData) {
    const clonedState: IDashboardStore = cloneObject(state);
    switch (action.type) {
        case DASCHBOARD_VIEW_DATA:
            clonedState.data = reinterpreteData(action.rootData);
            console.log('DashboardData recieved: ' + action.rootData);
            return clonedState;
    }
    return state;
}

function reinterpreteData(data: any) {
    const reinterpreteDataAsList: DashBoardObject[] = new Array();
    if (data !== undefined) {
        for (const key in data) {
            if (data[key] !== undefined) {
                const dashBoardObject = new DashBoardObject();
                dashBoardObject.date = data[key].date;
                dashBoardObject.value = data[key].value;
                dashBoardObject.id = key;
                reinterpreteDataAsList.push(dashBoardObject);
            }
        }
    }

    return reinterpreteDataAsList;
}

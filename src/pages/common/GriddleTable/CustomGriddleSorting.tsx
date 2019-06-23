import * as moment from 'moment';

export const numberSort = (data: any, column: any, sortAscending = true): any => {
    const columnName = column;
    const sort = sortAscending;
    return data.sort(
        (map1: any, map2: any) => {
            const valueMap1 = map1.get(columnName).get('data');
            const valueMap2 = map2.get(columnName).get('data');
            if (valueMap1 < valueMap2) {
                return sort ? 1 : -1;
            } else if (valueMap1 > valueMap2) {
                return sort ? -1 : 1;
            } else {
                return 0;
            }
        });
};

export const dateSort = (data: any, column: any, sortAscending = true): any => {
    const columnName = column;
    const sort = sortAscending;
    return data.sort(
        (map1: any, map2: any) => {
            const valueMap1: moment.Moment = moment(map1.get(columnName).get('data'));
            const valueMap2: moment.Moment = moment(map2.get(columnName).get('data'));
            if (valueMap1.isBefore(valueMap2)) {
                return sort ? 1 : -1;
            } else if (valueMap1.isAfter(valueMap2)) {
                return sort ? -1 : 1;
            } else {
                return 0;
            }
        });
};

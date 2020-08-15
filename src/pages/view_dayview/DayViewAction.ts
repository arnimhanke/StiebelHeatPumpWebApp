import { Dispatch } from 'redux';
import { AccessParamterHeadDto, DefaultApi, Timeseries } from '../../util/tsts/api';
import {getRequest} from '../common/RequestHelper';
import { DAYVIEW_DATA, DAYVIEW_DATA_TIMESERIES } from './DayViewContainer';

export function onGetDataForDayView(from: String, to: String) {
    return getRequest('/dayview?from=' + from + '&to=' + to, DAYVIEW_DATA, {fromDateAsString: from, toDateAsString: to});
}

export function onGetTimeseriesForDayView(from: String, to: String, token: string) {

    const baseAPI = new DefaultApi({accessToken: token});
    const accessParam: AccessParamterHeadDto = {
        tsComposedKey: {
            databaseName: 'StiebelEltronHeatPumpRawDatasTest',
            tsId: 'ia_aussentemperatur',
        },
    };

    return ((dispatch: Dispatch<any>) => {
        const ret  = baseAPI.getTimeseriesValuesByAccessParameterValuesDto(accessParam, from.toString() + '/' + to.toString());
        ret.then((value: Timeseries) => {
            console.log('Held der Daten');
            dispatch( {
                rootData: value,
                type: DAYVIEW_DATA_TIMESERIES,
                undefined,
            });
        }).then((reason: any) => {
            console.log('Dein Hammer ist kaputt!!!');
        });
    });
}

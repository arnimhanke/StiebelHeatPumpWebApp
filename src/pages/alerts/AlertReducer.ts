import { clone } from '../../util/store/ObjectUtils';
import * as AlertActionTypes from './AlertActionTypes';

export interface IAlertStore {
    alertInfo: any[];
}

const initialState: IAlertStore = {
    alertInfo: new Array(),
};

export function AlertReducer(state = initialState, action: any) {
    const clonedState = clone<any>(state);
    switch (action.type) {
        case AlertActionTypes.SHOW_ALERT:
            const alertInformation = action.alertInfo;
            const ids = clonedState.alertInfo.map((alertInfo: any) => alertInfo.id);
            let id;
            do {
                id = Math.floor((Math.random() * 999) + 1);
            } while (ids.includes(id));
            alertInformation.id = id;
            clonedState.alertInfo.unshift(alertInformation);
            return clonedState;
        case AlertActionTypes.CLOSE_ALERT:
            clonedState.alertInfo = clonedState.alertInfo.filter((alertInfo: any) => {
                return alertInfo.type !== action.alertType;
            });
            return clonedState;
        default:
            return state;
    }
}

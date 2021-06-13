import { Action, Dispatch } from 'redux';
import {onShowAlert} from '../alerts/AlertActions';
import {ALERT_ERROR, ALERT_INFO, ALERT_SUCCESS, ALERT_WARNING} from '../alerts/AlertComponent';

export interface IDispatchObjectExternData extends Action {
    rootData: any;
    optionalData: any;
}

export interface IDispatchObjectInternData extends Action {
    data: any;
}

/**
 * Executes a Get-Request to the given REST-API
 *
 * @param postfix Address for
 * @param dispatchType Type for the Dispatch-Object
 * @param optionalData Optional-Data for the Dispatch-Object
 */
export function getRequest<T>(postfix: string, dispatchType: string, optionalData?: any) {
    return ((dispatch: Dispatch<T>) => {
        try {
            let ipPrefix = location.host.split(':')[0];
            if (location.host === '') {
                ipPrefix = 'localhost';
            }
            if (!ipPrefix.includes('http://')) {
                ipPrefix = 'http://' + ipPrefix;
            }
            ipPrefix = 'http://192.168.178.93';
            fetch(ipPrefix + ':4567' + postfix, {
                method: 'GET',
            })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    console.log('Fehler beim Abruf der Daten', response);
                    onShowAlert(ALERT_ERROR, 'Fehler beim Abrufen von Daten: ', response.statusText);
                } else {
                    return response.json();
                }
            }).then((responseData) => {
                console.log(responseData);
                dispatch( {
                    rootData: responseData,
                    type: dispatchType,
                    optionalData,
                });
            });
        } catch (error) {
            console.log(error);
            onShowAlert(ALERT_ERROR, 'Fehler beim Abrufen von Daten: ', error.message);
        }
    });
}

import * as AlertActionTypes from './AlertActionTypes';

export function onShowAlert(alertType: string, alertTitle: string, alertMessage: string) {
    const alertInformation = {
        type: alertType,
        title: alertTitle,
        message: alertMessage,
    };

    return ((dispatch: any) => {
        dispatch({
            type: AlertActionTypes.SHOW_ALERT,
            alertInfo: alertInformation,
        });
    });
}

export function onCloseAlert(alertTypeToRemove: any) {
    return ((dispatch: any) => {
        dispatch({
            type: AlertActionTypes.CLOSE_ALERT,
            alertType: alertTypeToRemove,
        });
    });
}

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as AlertActions from './AlertActions';
import { IAlertStore } from './AlertReducer';
import { CustomAlert } from './CustomAlert';

export const ALERT_ERROR = 'danger';
export const ALERT_WARNING = 'warning';
export const ALERT_INFO = 'info';
export const ALERT_SUCCESS = 'success';

export interface IAlertProperties {
    alertInfo: any[];
}

export interface IAlertActions {
    actions: {
        closeAlert: (alertType: string) => any,
    };
}

type ComponentProps = IAlertProperties & IAlertActions;

export class AlertComponentPlain extends React.Component<ComponentProps, {}> {
    constructor(props: ComponentProps) {
        super(props);
    }

    public shouldComponentUpdate(newProps: ComponentProps, newState: {}) {
        return true;
    }

    public getDismissHandler(alertType: string) {
        const that = this;
        return () => {
            that.props.actions.closeAlert(alertType);
        };
    }

    public render(): JSX.Element {
        const dangerAlerts: any[] = [];
        const successAlerts: any[] = [];
        const infoAlerts: any[] = [];
        const warningAlerts: any[] = [];

        this.props.alertInfo.map((alertInfo: any) => {
            switch (alertInfo.type) {
                case ALERT_ERROR:
                    dangerAlerts.push([alertInfo, this.getDismissHandler(alertInfo.type)]);
                    break;
                case ALERT_WARNING:
                    warningAlerts.push([alertInfo, this.getDismissHandler(alertInfo.type)]);
                    break;
                case ALERT_INFO:
                    infoAlerts.push([alertInfo, this.getDismissHandler(alertInfo.type)]);
                    break;
                case ALERT_SUCCESS:
                    successAlerts.push([alertInfo, this.getDismissHandler(alertInfo.type)]);
                    break;
                default: break;
            }
        });

        const alerts = [dangerAlerts, successAlerts, infoAlerts, warningAlerts];

        return (
            <div>{
                (this.props.alertInfo !== undefined && this.props.alertInfo.length !== 0) ?
                    <div className='alert-container'>
                        {alerts.map((alertTypeArray, index) =>
                            <CustomAlert key={index} alertArray={alertTypeArray} />)}
                    </div>
                    : null
            }</div>
        );
    }
}

function mapStateToProps(state: { alertReducer: IAlertStore }): IAlertProperties {
    return {
        alertInfo: state.alertReducer.alertInfo,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAlertProperties>): IAlertActions {
    return {
        actions: bindActionCreators({ closeAlert: AlertActions.onCloseAlert }, dispatch),
    };
}

export const AlertComponent: any = connect(mapStateToProps, mapDispatchToProps)(AlertComponentPlain);

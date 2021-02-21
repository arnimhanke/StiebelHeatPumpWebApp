import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import { AbstractView } from '../common/AbstractComponent';
import { IDashboardStore } from './DashboardReducer';

export interface IDashboardProperties {
    dashboardStore: IDashboardStore;
}

export interface IDashboardActions {
    actions: {
        getDataForDashboard: () => any;
    };
}

type DashboardProps = IDashboardProperties & IDashboardActions;

export class DashboardPlain extends AbstractView<DashboardProps, {}> {

    public componentDidMount() {
        this.props.actions.getDataForDashboard();
    }

    public render() {
        console.log(this.props.dashboardStore.data);
        return (
            <div>
                {this.props.dashboardStore.data.map((data) => {
                    return (
                        <Row id={data.id}>
                            <Col>
                                {data.id}
                            </Col>

                            <Col>
                                {data.value}
                            </Col>
                        </Row>
                    );
                })}
            </div>
        );
    }

}

import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import * as Highcharts from 'highstock-release/highstock';
import * as moment from 'moment';
import { AbstractView } from '../common/AbstractComponent';
import { IDayViewStore } from './DayViewReducer';

export interface IDayViewProperties {
    DayViewStore: IDayViewStore;
}

export interface IDayViewActions {
    actions: {
        getDataForDayView: (from: String, to: String) => any;
    };
}

type DayViewProps = IDayViewProperties & IDayViewActions;

export class DayViewPlain extends AbstractView<DayViewProps, {}> {

    public componentDidMount() {
        this.props.actions.getDataForDayView(   moment('2018-02-02').startOf('day').toISOString(),
                                                moment('2018-02-03').startOf('day').toISOString());

    }

    public shouldComponentUpdate(nextProps: DayViewProps, nextState: {}) {
        return true;
    }

    public render() {
        console.log('didRender');
        if (this.props && this.props.DayViewStore && this.props.DayViewStore.series && this.props.DayViewStore.series.length > 0) {
            Highcharts.stockChart('chart', {
                series: this.props.DayViewStore.series,
            });
        }
        return (
            <div>
                <Row>
                    <Col>
                        DayView
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id='chart'/>
                    </Col>
                </Row>
            </div>
        );
    }

}

import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import * as Highcharts from 'highstock-release/highstock';
import * as moment from 'moment';
import * as DateTimePicker from 'react-datetime';
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

    constructor(props: DayViewProps, state: {}) {
        super(props, state);
        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        this.props.actions.getDataForDayView(   moment().startOf('day').toISOString(),
                                                moment().add(1, 'd').startOf('day').toISOString());

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
                        <DateTimePicker
                        onChange={this.onChange}
                        timeFormat={null}
                        closeOnSelect={true}
                        value={this.props.DayViewStore.selectedDate}
                        />
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

    private onChange(selectedDate: moment.Moment) {
        console.log(selectedDate);
        this.props.actions.getDataForDayView( moment(selectedDate).startOf('day').subtract(1, 'months').toISOString(),
                                                moment(selectedDate).startOf('day').add(2, 'd').toISOString());
    }

}

import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

// import { DateBox } from 'devextreme-react/ui/date-box';
import * as Highcharts from 'highstock-release/highstock';
import moment from 'moment';
import { AbstractView } from '../common/AbstractComponent';
import { IDayViewStore } from './DayViewReducer';

export interface IDayViewProperties {
    DayViewStore: IDayViewStore;
    keycloakInformations: Keycloak.KeycloakInstance;
}

export interface IDayViewActions {
    actions: {
        getDataForDayView: (from: String, to: String) => any;
        getTimeseriesForDayView: (from: String, to: String, token: string) => any;
    };
}

type DayViewProps = IDayViewProperties & IDayViewActions;

export class DayViewPlain extends AbstractView<DayViewProps, {}> {

    constructor(props: DayViewProps, state: {}) {
        super(props, state);
        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        // this.props.actions.getDataForDayView(moment().startOf('day').toISOString(),
        //     moment().add(1, 'd').startOf('day').toISOString());
        if (this.props.keycloakInformations) {
            this.props.actions.getTimeseriesForDayView(moment().startOf('day').toISOString(),
                moment().add(1, 'd').startOf('day').toISOString(), this.props.keycloakInformations.token);
        }

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
                        {/* <DateBox
                            // onChange={this.onChange}
                            // timeFormat={null}
                            // closeOnSelect={true}
                            // value={this.props.DayViewStore.selectedDate}
                        /> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id='chart' />
                    </Col>
                </Row>
            </div>
        );
    }

    private onChange(selectedDate: moment.Moment) {
        console.log(selectedDate);
        // this.props.actions.getDataForDayView(moment(selectedDate).startOf('day').subtract(1, 'months').toISOString(),
        //     moment(selectedDate).startOf('day').add(2, 'd').toISOString());
        if (this.props.keycloakInformations) {
            this.props.actions.getTimeseriesForDayView(selectedDate.startOf('day').toISOString(),
            selectedDate.add(1, 'd').startOf('day').toISOString(), this.props.keycloakInformations.token);
        }
    }

}

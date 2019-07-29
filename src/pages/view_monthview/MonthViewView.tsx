import * as moment from 'moment';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import * as DateTimePicker from 'react-datetime';
import { AbstractView } from '../common/AbstractComponent';
import * as ExportToCSV from '../common/export/ExportToCSV';
import { GriddleTableButtonColumn } from '../common/GriddleTable/GriddleTableButtonColumn';
import { IMonthViewStore } from './MonthViewReducer';

import '../../ressources/style/react-datetime.css';

export interface IMonthViewProperties {
    monthViewStore: IMonthViewStore;
}

export interface IMonthViewActions {
    actions: {
        getDataForMonthView(from: string, to: string): any;
    };
}

type MonthViewProps = IMonthViewProperties & IMonthViewActions;

export class MonthViewPlain extends AbstractView<MonthViewProps, {}> {

    constructor(props: MonthViewProps, state: {}) {
        super(props, state);
        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        this.props.actions.getDataForMonthView( this.props.monthViewStore.selectedDate.subtract(30, 'd').startOf('day').toISOString(),
                                                this.props.monthViewStore.selectedDate.subtract(1, 'd').startOf('day').toISOString());
    }

    public render() {
        if (this.props.monthViewStore.valuesForMonthView) {
            const arrayAsCSV = ExportToCSV.convertToCSV(this.props.monthViewStore.valuesForMonthView);
            ExportToCSV.crateFileFromStringAnDownload(arrayAsCSV);
        }
        return (
            <div>
                <Row>
                    <Col>
                        MonthView
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={2} md={8}>
                        <DateTimePicker
                        onChange={this.onChange}
                        timeFormat={null}
                        closeOnSelect={true}
                        value={this.props.monthViewStore.startDate}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a id={'download_link'} download='my_exported_file.csv'>Download as Text File</a>
                    </Col>
                </Row>
                <Row>
                    <GriddleTableButtonColumn
                                    data={this.props.monthViewStore.valuesForMonthView}
                                    columns={this.props.monthViewStore.columns}
                                    onClick={(e: any) => {}}
                                    showButtonColumn={false}
                                    dateTimeFormat={'LLLL'}
                                    tableName={'monthView'}/>
                </Row>
            </div>
        );
    }

    private onChange(selectedDate: moment.Moment) {
        console.log(selectedDate);
        this.props.actions.getDataForMonthView( moment(selectedDate).startOf('day').subtract(1, 'months').toISOString(),
                                                moment(selectedDate).startOf('day').add(2, 'd').toISOString());
    }

}

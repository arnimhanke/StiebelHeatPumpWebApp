import * as Griddle from 'griddle-react';
import * as React from 'react';
import { Row } from 'react-bootstrap';
import { createSelector } from 'reselect';

import { ColumnSettings } from './CustomColumnChooser';
import { CustomBooleanColumn, CustomDateColumn, CustomNumberColumn, CustomStringColumn } from './CustomGriddleColumns';
import {
    CustomFilter,
    CustomNextButton,
    CustomPageDropDown,
    CustomPagination,
    CustomPreviousButton,
    CustomRow,
    CustomSettings,
    CustomSettingsToggle,
    CustomSettingsWrapper,
    CustomTableHeading,
} from './CustomGriddleComponents';
import { dateSort, numberSort } from './CustomGriddleSorting';
import { PageSizeSettings } from './CustomPageSizeSettings';
import { GriddleTableValueDto } from './GriddleTableValueDto';

const CustomLayout = ({ Table, Pagination, Filter, SettingsWrapper }: any) => (
    <div>
        <SettingsWrapper />
        <Filter />
        <Table />
        <Pagination />
    </div>
);

const styleConfig = {
    classNames: {
        Table: 'table',
    },
};

export let griddleTablesConfig: { [key: string]: boolean };
export let currentTableName: string;

export interface IComponentProps {
    onClick: (e: any) => any;
    columns: string[];
    data: Array<{ [key: string]: GriddleTableValueDto }>;
    showButtonColumn: boolean;
    dateTimeFormat: string;
    hiddenColumns?: { [key: string]: boolean };
    mapColumnNameToRoundingPrecision?: { [key: string]: number };
    tableName?: string;
}

export class GriddleTableButtonColumn extends React.Component<IComponentProps, {}> {

    // Definition des Layouts und der CustomComponents
    public settingsComponentObjects = {
        columnChooser: { order: 2, component: () => <ColumnSettings /> },
        pageSizeSettings: { order: 4, component: () => <PageSizeSettings /> },
    };

    public components = {
        Filter: CustomFilter,
        Layout: CustomLayout,
        NextButton: CustomNextButton,
        PageDropdown: CustomPageDropDown,
        Pagination: CustomPagination,
        PreviousButton: CustomPreviousButton,
        Row: CustomRow(this),
        Settings: CustomSettings,
        SettingsToggle: CustomSettingsToggle,
        SettingsWrapper: CustomSettingsWrapper,
        TableHeading: CustomTableHeading(this),
    };

    public CustomTextProperties = {
        next: 'Nächste',
        previous: 'Vorherige',
        settingsToggle: '',
    };

    constructor(props: IComponentProps, state: {}) {
        super(props, state);
    }

    public render(): JSX.Element {
        const columnDefinitions: any[] = [];
        if (this.props.data !== undefined && this.props.data.length > 0 && this.props.data[0] !== undefined) {
            // Setzen des momentanen Tabellen Namens
            currentTableName = this.props.tableName;
            // Neu initialisieren der lokalen Config, da nicht vorhanden.
            griddleTablesConfig = {};

            for (const key in this.props.columns) {
                if (this.props.data[0].hasOwnProperty(this.props.columns[key])) {
                    const value: GriddleTableValueDto = this.props.data[0][this.props.columns[key]];
                    let visible = true;
                    // Überprüfung, ob die aktuelle Zeitreihe von Anfang ausgeblendet werden soll
                    if (griddleTablesConfig && griddleTablesConfig[this.props.columns[key]] !== undefined) { // Check ob Client Config da ist (wird beim Mount geladen)
                        visible = griddleTablesConfig[this.props.columns[key]];
                    } else if (this.props.hiddenColumns !== undefined) { // Check ob Server Config da ist falls Client keine hat
                        visible = this.props.hiddenColumns[this.props.columns[key]] === undefined;
                        griddleTablesConfig[this.props.columns[key]] = visible; // Initialisieren der Local Config
                    } else {
                        griddleTablesConfig[this.props.columns[key]] = visible; // Initialisieren der local config
                    }
                    // Je nach Type der Zeitreihe wird eine andere Column-Definition genutzt
                    switch (value.type) {
                        case 'number':
                            const roundPrecision: number = this.props.mapColumnNameToRoundingPrecision !== undefined ?
                                this.props.mapColumnNameToRoundingPrecision[this.props.columns[key]] : undefined;
                            columnDefinitions.push(<Griddle.ColumnDefinition key={this.props.columns[key]} id={this.props.columns[key]}
                                customComponent={CustomNumberColumn(roundPrecision !== undefined ? roundPrecision : 4).bind(this)}
                                sortMethod={numberSort} visible={visible} />);
                            break;
                        case 'date':
                            columnDefinitions.push(<Griddle.ColumnDefinition key={this.props.columns[key]} id={this.props.columns[key]}
                                customComponent={CustomDateColumn(this)} sortMethod={dateSort} visible={visible} />);
                            break;
                        case 'boolean':
                            columnDefinitions.push(<Griddle.ColumnDefinition key={this.props.columns[key]} id={this.props.columns[key]}
                                customComponent={CustomBooleanColumn.bind(this)} visible={visible} />);
                            break;
                        case 'string':
                        default:
                            columnDefinitions.push(<Griddle.ColumnDefinition key={this.props.columns[key]} id={this.props.columns[key]}
                                customComponent={CustomStringColumn.bind(this)} visible={visible} />);
                    }
                }
            }
        }

        return (
            <div>
                <Griddle.default
                    noDataMessage='Es wurden keine Daten zum Anzeigen gefunden'
                    data={this.props.data} styleConfig={styleConfig}
                    columnTitles={this.props.columns}
                    settingsComponentObjects={this.settingsComponentObjects}
                    pageProperties={{pageSize: 10}}
                    components={this.components}
                    plugins={[Griddle.plugins.LocalPlugin]}
                    key={new Date().toISOString()}>
                    {
                        columnDefinitions.length > 0 ?
                            <Griddle.RowDefinition>
                                {columnDefinitions}
                            </Griddle.RowDefinition> : ''
                    }
                </Griddle.default>
            </div>
        );
    }
}

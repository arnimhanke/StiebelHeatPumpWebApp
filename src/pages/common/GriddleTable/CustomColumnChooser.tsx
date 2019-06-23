import * as griddleUtils from 'griddle-react/dist/module/utils';
import * as React from 'react';
import { Button, Col, Dropdown, DropdownButton, DropdownMenu, MenuItem, SelectCallback } from 'react-bootstrap';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import * as actions from 'griddle-react/dist/module/actions/index.js';
import * as selectors from 'griddle-react/dist/module/selectors/dataSelectors';

const style = {
    label: { clear: 'both' },
};

interface IColumn {
    checked: boolean;
    id: string;
    order: number;
    title: string;
    visible: boolean;
}

const ComposedColumnSettings = compose(
    griddleUtils.default.connect(
        (state: any) => ({
            hiddenColumns: selectors.hiddenColumnPropertiesSelector(state),
            visibleColumns: selectors.visibleColumnPropertiesSelector(state),
        }),
        {
            toggleColumn: actions.toggleColumn,
        },
    ),
    withHandlers({
        onToggle:  ({ toggleColumn }: any) => (eventKey: any, e: any) => {
            const idWithExtension = e.target.id;
            const id = idWithExtension.split('-')[0];
            toggleColumn(id);
        },
    }),
)(({ visibleColumns, hiddenColumns, onToggle }: { visibleColumns: IColumn[]; hiddenColumns: IColumn[]; onToggle: any }) => {
    const columns: IColumn[] = [];

    visibleColumns.forEach((col: IColumn) => {
        if (col.id !== 'griddleKey' && col !== undefined) {
            col.checked = true;
            columns.push(col);
        }
    });

    hiddenColumns.forEach((col: IColumn) => {
        if (col.id !== 'griddleKey' && col !== undefined) {
            col.checked = false;
            columns.push(col);
        }
    });

    // columns.sort((a, b) => a.id !== null ? a.id.localeCompare(b.id !== null ? b.id : b.title) : a.title.localeCompare(b.id !== null ? b.id : b.title));

    return (
        <DropdownButton title={'Auswählen'} id={'columnChooserGriddle'} key={'columnChooserGriddle'} multiple>
            {Object.keys(columns).map((v: any) =>
                <MenuItem key={'GriddleTableColumnChooserMenuItem' + columns[v].id} id={columns[v].id + '-menuItem'}
                            onSelect={(eventKey: any, e?: React.SyntheticEvent<{}>) => onToggle(eventKey, e)}>
                    <label
                        htmlFor={columns[v].id + '-input'}
                        key={columns[v].id + '-label'}
                        style={style.label}
                        className={'columnSelectorLabel'}
                        id={columns[v].id + '-label'}>
                        <input
                            style={{float: 'left', marginRight: '5px'}}
                            type='checkbox'
                            name={columns[v].id}
                            checked={columns[v].checked}
                            id={columns[v].id + '-input'}
                            key={columns[v].id + '-input'}
                            onChange={(e) => {}}/>
                        <div id={columns[v].id + '-div'}>{columns[v].title || columns[v].id}</div>
                    </label>
                </MenuItem>,
            )}
        </DropdownButton>
    );
});

export const ColumnSettings = ComposedColumnSettings;

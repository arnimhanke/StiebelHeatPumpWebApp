import * as actions from 'griddle-react/dist/module/actions/index.js';
import * as selectors from 'griddle-react/dist/module/selectors/dataSelectors';
import * as griddleUtils from 'griddle-react/dist/module/utils';
import * as React from 'react';
import { Button, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
export let count = 15;

export const PageSizeSettings = compose(
    griddleUtils.default.connect(
        (state: any) => ({
            maxPageSize: selectors.dataSelector(state).size,
            pageSize: selectors.pageSizeSelector(state),
        }),
        {
            setPageSize: actions.setPageSize,
        },
    ),
    withState('value', 'updateValue', ''),
    withHandlers({
        onChange: (props: any) => (e: any) => {
            props.updateValue(e.target.value);
        },
        onSave: (props: any) => (e: number) => {
            props.setPageSize('' + e);
        },
    }),
)(({ maxPageSize, pageSize, onChange, onSave }: any) => {
    const menuItems: any[] = [];
    if (maxPageSize && maxPageSize < 10) {
        onSave(maxPageSize);
    }
    for (let i = 10; i < maxPageSize; i += 10) {
        menuItems.push(
            <MenuItem key={i} eventKey={i}
                onSelect={(e: any) => {
                    const obj = { target: { value: e } };
                    onChange(obj);
                    onSave(e);
                }}>
                {i}
            </MenuItem>);
    }
    menuItems.push(
        <MenuItem key={maxPageSize} eventKey={maxPageSize}
            onSelect={(e: any) => {
                const obj = { target: { value: e } };
                onChange(obj);
                onSave(e);
            }}>
            {maxPageSize}
        </MenuItem>);
    return (
        <DropdownButton id='pageSizeSetting' title={'Ergebnisse: ' + pageSize}>
            {menuItems}
        </DropdownButton>
    );
},
);

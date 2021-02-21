import moment from 'moment';
import * as React from 'react';
import { InputGroup  } from 'react-bootstrap/esm';

import { IComponentProps } from './GriddleTableButtonColumn';

export const CustomDateColumn = (thisZeiger: React.Component<IComponentProps, {}>) => ({ value }: any) => {
    return (
        <span>{moment(value.get('data')).format(thisZeiger.props.dateTimeFormat)}</span>
    );
};

export const CustomNumberColumn = (roundingPrecision: number) => ({ value }: any) => {
    let parsedValue = '';
    try {
        parsedValue = parseFloat(value.get('data')).toLocaleString(undefined, {maximumFractionDigits: roundingPrecision});
    } catch {
        console.log(value);
    }
    return (
        <span>{parsedValue}</span>
    );
};

export const CustomStringColumn = ({ value }: any) => {
    return (
        <span>{value.get('data')}</span>
    );
};

export const CustomBooleanColumn = ({ value }: any) => {
    return (
        <span>
            <InputGroup>
                <InputGroup.Checkbox inline readOnly checked={value.get('data') === 'true'}></InputGroup.Checkbox>
            </InputGroup>
        </span>
    );
};

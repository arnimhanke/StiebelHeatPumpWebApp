import * as moment from 'moment';
import * as React from 'react';
import { Button, ButtonToolbar, Col, DropdownButton, MenuItem, Row } from 'react-bootstrap';

import { IComponentProps } from './GriddleTableButtonColumn';

export const CustomRow = (thisZeiger: React.Component<IComponentProps, {}>): any =>
    ({ Cell, griddleKey, columnIds, onClick, onMouseEnter, onMouseLeave, style, className }: any) => {
        const showButton = thisZeiger.props.showButtonColumn && thisZeiger.props.columns.length > 2;
        const cells = columnIds.map((c: any) => {
            if (c !== 'griddleKey') {
                return (
                    <Cell
                        key={c + '-' + griddleKey}
                        griddleKey={griddleKey}
                        columnId={c}
                        className={className}
                    />
                );
            }
        });
        let buttons: any = null;
        if (showButton) {
            buttons = <td>
                <Button onClick={thisZeiger.props.onClick}
                    value={griddleKey}
                    className='glyphicon glyphicon-search'>
                </Button>
            </td>;
        }
        return (
            <tr key={griddleKey}
                className={className}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}>
                {cells}
                {buttons ? buttons : undefined}
            </tr>
        );
    };

export const CustomTableHeading = (thisZeiger: React.Component<IComponentProps, {}>): any =>
    ({ columnTitles, columnIds, TableHeadingCell, style, className }: any) => {
        const headingCells = columnIds.map((t: any) => {
            if (t !== 'griddleKey') {
                return (
                    <TableHeadingCell key={t} title={t} columnId={t} />
                );
            }
        });
        if (thisZeiger.props.showButtonColumn && columnTitles.length > 2) {
            headingCells.push(<TableHeadingCell key={'btn'} columnId={'btn'} title={''} />);
        }
        return (
            <thead style={style} className={className}>
                <tr>
                    {headingCells}
                </tr>
            </thead>
        );
    };

export const CustomNextButton = ({ hasNext, onClick, style, className, text }: any) => (
    <Button type='button' onClick={onClick} disabled={!hasNext}>{text}</Button>
);

export const CustomPreviousButton = ({ hasPrevious, onClick, style, className, text }: any) => (
    <Button type='button' onClick={onClick} disabled={!hasPrevious}>{text}</Button>
);

export const CustomPageDropDown = (ref7: { maxPages: any, currentPage: any, className: any, style: any, setPage: any }) => {
    const arr: any[] = Array(ref7.maxPages).fill(0).map((_: any, i: any) => i + 1);
    return (
        <DropdownButton style={{ width: '75px', float: 'left', marginLeft: '5px' }} onChange={(e: any) => ref7.setPage(parseInt(e.target.value, 10))}
                        title={ref7.currentPage + '/' + ref7.maxPages} id={'griddlePageChooser'} dropup={true} className='griddleDropdownStyle'>
            {
                arr.map((num: number) => (
                    <MenuItem eventKey={num} value={num} key={'griddlePagination_' + num}
                        onSelect={(e: any) => {
                            ref7.setPage(e);
                        }}>
                        {num}
                    </MenuItem>
                ))
            }
        </DropdownButton>
    );
};

export const CustomPagination = ({ Next, Previous, PageDropdown, style, className }: any) => (
    <ButtonToolbar style={style} className={className}>
        {Previous && <Previous />}
        {PageDropdown && <PageDropdown />}
        {Next && <Next />}
    </ButtonToolbar>
);

export const CustomSettingsWrapper = ({ SettingsToggle, Settings, isEnabled, isVisible, style, className }: any) => (
    isEnabled ? (
      <div style={{float: 'right', width: '75%'}} className={className}>
        { <Settings key={'CustomSettingsKey'}/> }
      </div>
    ) : null
  );

export const CustomSettingsToggle = ({ onClick, text, style, className }: any) => (
    <Button
        onClick={onClick}
        type='button'
        style={style}
        className={className}>
        {text}
    </Button>
);

export const CustomSettings = ({ settingsComponents, style, className }: any) => (
    <Row style={{marginTop: '0px'}}>
        <Col md={7} xs={0}/>
        <Col md={5}>
            <ButtonToolbar style={{float: 'right'}}>
                {settingsComponents && settingsComponents.map((SettingsComponent: any, i: any) => {
                    return (SettingsComponent && <SettingsComponent key={'SettingComponent_' + i}/>);
                    })
                }
            </ButtonToolbar>
        </Col>
    </Row>
);

export class CustomFilter extends React.Component<{setFilter: (e: any) => any, style: any, className: any}, {}> {

    public setFilter = (e: any) => {
        const filter = (row: any) => {
            let found = false;
            row.forEach( (column: any) => {
                if (!found) {
                    if (column.get !== undefined && column.get('data') !== undefined) {
                        const filterString = e.target.value;
                        const value = column.get('data');
                        switch (column.get('type')) {
                            case 'number':
                                found = Number.parseFloat(value).toLocaleString().indexOf(filterString) > -1;
                                break;
                            case 'date':
                                found = moment(value).toString().indexOf(filterString) > -1;
                            case 'boolean':
                            case 'string':
                            default:
                                found = value.indexOf(filterString) > -1;
                        }
                    }
                }
            });
            return found;
        };
        this.props.setFilter(filter);

    }

    public render() {
        return (
            <input
            type='text'
            name='filter'
            placeholder={'Suche'}
            onChange={this.setFilter}
            style={this.props.style}
            className={this.props.className}
            // tslint:disable-next-line:quotemark
            pattern={"[^'\x22]+"}
            />
        );
    }
}

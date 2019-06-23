import * as React from 'react';
import { Alert } from 'react-bootstrap';

export class CustomAlert extends React.Component<any, any> {
    public componentDidMount() {
        switch (this.props.type) {
            case 'danger':
                console.log('danger!');
                break;
        }
    }

    public render() {
        if (this.props.alertArray.length > 0) {
            return (
                <Alert bsStyle={this.props.alertArray[0][0].type} onDismiss={this.props.alertArray[0][1]} >
                    {this.props.alertArray.map((alert: any, index: any) =>
                        <div className='alert-spacing' key={'alert' + index}>
                            <div className='alert-title'>{alert[0].title}</div>
                            <div className='alert-message'>{alert[0].message}</div>
                        </div>,
                    )}
                </Alert>
            );
        } else {
            return null;
        }
    }
}

import * as React from 'react';
import { AccessParamterHeadDto, DefaultApi } from '../../util/tsts/api';
import { IAppViewProperties } from '../main/App';

export class InfluxDBView_Plain extends React.Component<IAppViewProperties, {}> {

    constructor(props: IAppViewProperties, state: {}) {
        super(props, state);
    }

    public shouldComponentUpdate(nextProps: IAppViewProperties, nextState: any) {
        return true;
    }

    public componentDidMount() {
        if (this.props.keycloakInformations != undefined) {
            const baseAPI = new DefaultApi({accessToken: this.props.keycloakInformations ? this.props.keycloakInformations.token : ''});
            const accessParam: AccessParamterHeadDto = {
                tsComposedKey: {
                    databaseName: 'StiebelEltronHeatPumpRawDatasTest',
                    tsId: 'ia_aussentemperatur',
                },
            };
            baseAPI.getTimeseriesDefinitionByAccessParamterHeadDto(accessParam);
        }
    }

    public render() {
        return (<div>
            Influxkram
        </div>);
    }

}

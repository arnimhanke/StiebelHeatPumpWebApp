import React = require('react');

import * as Keycloak from 'keycloak-js';
import { Redirect } from 'react-router-dom';

export interface ILoginViewProperties {
    history: any;
    keycloakInformations: Keycloak.KeycloakInstance;
}

export interface ILoginViewActions {
    actions: {
        addKeycloakInformation(keycloak: Keycloak.KeycloakInstance): any;
    };
}

type ComponentProps = ILoginViewProperties & ILoginViewActions;

export class LoginViewPlain extends React.Component<ComponentProps, {}> {

    constructor(props: ComponentProps, state: {}) {
        super(props, state);
    }

    public shouldComponentUpdate(newProps: ComponentProps, newState: {}) {
        if (newProps.keycloakInformations != undefined && this.props.keycloakInformations == undefined) {
            return true;
        }

        if (newProps.keycloakInformations != undefined && this.props.keycloakInformations != undefined
            && newProps.keycloakInformations.token != this.props.keycloakInformations.token) {
            return true;
        }

        return false;
    }

    public componentDidMount() {

        if (this.props.keycloakInformations == undefined) {
            const keycloak = Keycloak();
            keycloak.init({ onLoad: 'login-required' })
                .success(() => {
                    console.log('jojo, hat geklappt' + keycloak);
                    this.props.actions.addKeycloakInformation(keycloak);
                })
                .error((error: any) => console.log('Hier ist was shief gelaufen: ' + error));
        }
    }

    public render() {
        if (this.props.keycloakInformations != undefined) {
            return (<div> eingeloggt {this.props.keycloakInformations.authenticated} </div>);
        } else {
            return (<div>eingeloggt</div>);
        }
    }

}

import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppStore } from './App';
import { ILoginStore } from './LoginReducer';
import { ILoginViewActions, ILoginViewProperties, LoginViewPlain } from './LoginView';

export const CHANGE_KEYCLOAK_INSTANCE = 'CHANGE_KEYCLOAK_INSTANCE';

function mapStateToProps(state: { loginReducer: ILoginStore }): ILoginViewProperties {
    return {
        history: {},
        keycloakInformations: state.loginReducer.keycloakInformations,
    };
}

function mapDispatchToProps(dispatch: Dispatch<ILoginViewProperties>): ILoginViewActions {
    return {
        actions: bindActionCreators({
                addKeycloakInformation: onAddKeycloakInformation,
        }, dispatch),
    };
}

function onAddKeycloakInformation(keycloakInformations: Keycloak.KeycloakInstance): any {
    return {
        data: keycloakInformations,
        type: CHANGE_KEYCLOAK_INSTANCE,
    };
}

export const LoginView: any = connect(mapStateToProps, mapDispatchToProps)(LoginViewPlain);

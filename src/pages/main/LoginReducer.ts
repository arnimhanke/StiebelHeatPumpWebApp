import { CHANGE_KEYCLOAK_INSTANCE } from '../..';
import { clone } from '../../util/store/ObjectUtils';

const initialState: ILoginStore = {
    keycloakInformations: undefined,
    token: undefined,
};

export interface ILoginStore {
    keycloakInformations: Keycloak.KeycloakInstance;
    token: string;
}

export function LoginReducer(state: ILoginStore = initialState, action: any) {
    switch (action.type) {

        case CHANGE_KEYCLOAK_INSTANCE:
            const dto: Keycloak.KeycloakInstance = action.data;
            const clonedState = clone(state);
            clonedState.keycloakInformations = dto;
            clonedState.token = dto.token;
            return clonedState;
    }
    return state;
}

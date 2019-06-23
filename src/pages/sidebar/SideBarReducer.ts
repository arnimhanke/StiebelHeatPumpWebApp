import { cloneObject } from '../../util/store/ObjectUtils';
import { ISidebarAction } from './SideBarActions';
import { CLOSE_SIDEBAR } from './SideBarContainer';

export interface ISideBarStore {
    isOpen: boolean;
}

const initialState: ISideBarStore = {
    isOpen: false,
};

export function SideBarReducer(state: ISideBarStore = initialState, action: ISidebarAction) {
    switch (action.type) {
        case CLOSE_SIDEBAR:
            const clonedState = cloneObject(state);
            clonedState.isOpen = false;
            return clonedState;
        default:
            return state;
    }
}

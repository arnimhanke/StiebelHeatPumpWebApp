import { CLOSE_SIDEBAR } from './SideBarContainer';

export interface ISidebarAction {
    data: {};
    type: string;
}

export function onCloseSidebar(): ISidebarAction {
    return {
        data: {},
        type: CLOSE_SIDEBAR,
    };
}

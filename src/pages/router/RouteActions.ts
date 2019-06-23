import { CHANGE_PAGE_TITLE } from './RouteContainer';

export function onChangePageTitle(newPageTitle: string) {
    return {
        data: newPageTitle,
        type: CHANGE_PAGE_TITLE,
    };
}

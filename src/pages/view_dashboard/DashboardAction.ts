
import {getRequest} from '../common/RequestHelper';

import {DASCHBOARD_VIEW_DATA} from './DashboardContainer';

export function onGetDataForDashboard() {
    return getRequest('/dashboard', DASCHBOARD_VIEW_DATA);
}

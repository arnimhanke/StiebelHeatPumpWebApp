
import {getRequest} from '../common/RequestHelper';

import { MONTH_VIEW_DATA } from './MonthViewContainer';

export function onGetDataForMonthView(from: string, to: string) {
    return getRequest('/monthview?from=' + from + '&to=' + to, MONTH_VIEW_DATA, {fromDateAsString: from, toDateAsString: to});
}

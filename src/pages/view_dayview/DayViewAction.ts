import {getRequest} from '../common/RequestHelper';
import { DAYVIEW_DATA } from './DayViewContainer';

export function onGetDataForDayView(from: String, to: String) {
    return getRequest('/dayview?from=' + from + '&to=' + to, DAYVIEW_DATA, {fromDateAsString: from, toDateAsString: to});
}

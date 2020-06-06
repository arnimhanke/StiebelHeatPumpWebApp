
import {getRequest} from '../common/RequestHelper';

import { MONTH_VIEW_DATA } from './MonthViewContainer';

export function onGetDataForMonthView(from: string, to: string) {
    const listInidicesAsString: string = '"ia_aussentemperatur","ia_quellentemperatur","ia_solltemperatur_fek","ia_isttemperatur_fek","ia_raumfeuchte","ia_taupunkttemperatur","ia_puffersolltemperatur","ia_pufferisttemperatur","ia_solltemperatur_hk_1","ia_isttemperatur_hk_1","ia_rücklaufisttemperatur","ia_vorlaufisttemperatur_wp","ia_vorlaufisttemperatur_nhz","ia_anlagenfrost","ia_heizungsdruck","ia_solltemperatur_gebläse","ia_isttemperatur_gebläse","ia_quellendruck","ia_volumenstrom","da_reststillstand","iw_waermemenge_vd_heizen_tag","iw_waermemenge_vd_heizen_summe","iw_leistungsaufnahme_vd_heizen_tag","iw_leistungsaufnahme_vd_heizen_summe","iw_vd_heizen","iw_vd_kühlen","iw_nhz_1","iw_nhz_2","iw_nhz_1_durch_2","iw_waermemenge_nhz_heizen_summe","iw_verdichter","da_verdichter","da_verdichterschuetz","da_heizkreis_1_pumpe","da_heizen","da_heizkreispumpe","da_quellenpumpe","da_pufferladepumpe"';
    return getRequest('/monthview?from=' + from + '&to=' + to + '&ids=' + listInidicesAsString + '&dbName=StiebelEltronHeatPumpCorrectedData&raster=PT1D', MONTH_VIEW_DATA, {fromDateAsString: from, toDateAsString: to});
}

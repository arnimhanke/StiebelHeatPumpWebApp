import moment from 'moment';

import { AggregationTypes, config } from '../../objects/AggregationConfig';
import { ValueDto } from '../../objects/ValueDto';

/**
 * Corrects the data from the database
 *
 * @param data Uncorrected data
 * @param start Start
 * @param end End
 * @param interval
 */
export function fixUpSeries(data: {[key: string]: ValueDto[]}, start: moment.Moment, end: moment.Moment, interval: number): {[key: string]: ValueDto[]} {

    const ret: {[key: string]: ValueDto[]} = {};

    for (const key in data) {
        if (data[key] !== undefined) {
            const values = data[key];
            let retValues: ValueDto[] = [];
            switch (config[key]) {
                case AggregationTypes.COUNT:
                case AggregationTypes.AVERAGE:
                case AggregationTypes.MAX:
                    retValues = values;
                    break;
                case AggregationTypes.MAX_BEFOR_MINOR:
                    retValues = fixUpSeriesMaxBeforeMinor(values, start, end, key, interval);
                    break;
                case AggregationTypes.DIV_VORTAG:
                    retValues = fixUpSeriesDivVortag(values, start, end, key, interval);
                    break;
            }

            ret[key] = retValues;
        }
    }

    return ret;
}

/**
 * Corrects the data for the TS-Type "Max-Before-Minor"
 */
function fixUpSeriesMaxBeforeMinor(data: ValueDto[], start: moment.Moment, end: moment.Moment, id: string, interval: number): ValueDto[] {
    console.log('fixUpSeriesMaxBeforeMinor ' + id);

    // Ersten Wert ignorieren
    data.slice(0, 1);

    // Nötige Variablen initialisieren
    const ret: ValueDto[] = [];
    const foundIntervals = 0;
    let lastValue = Number.parseFloat(data[0].value);
    const lastDate = data[0].date;
    if (isNaN(lastValue)) {
        lastValue = 0;
    }

    // Über alle Werte iterieren, auf das richtige Datum mappen, falls nötig.
    for (let i = 0; i < data.length; i++) {

        // Werte die vor dem Start liegen nicht beachten
        if (moment(data[i].date).isBefore(start)) {
            continue;
        }

        // Parsen des Wertes
        let parsedValue = Number.parseFloat(data[i].value);

        // Test ob der aktuelle Wert null ist
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }

        // Differenz zwischen den letzten Werten ermitteln
        ret.push(new ValueDto('' + parsedValue,  data[i].date));
    }
    return ret;
}

/**
 * Corrects the data for the TS-Type "Div-Vortag"
 */
function fixUpSeriesDivVortag(data: ValueDto[], start: moment.Moment, end: moment.Moment, id: string, interval: number): ValueDto[] {
    console.log('fixUpSeriesDivVortag ' + id);

    // Representierbarer Start generieren (Fehlerrate des ISGs)
    const representalStart: moment.Moment = moment(start);
    const date = moment(start).subtract(interval, 'ms');

    // Nötige Variablen initialisieren
    const ret: ValueDto[] = [];
    let lastValue = Number.parseFloat(data[0] .value);
    if (isNaN(lastValue)) {
        lastValue = 0;
    }

    // Über die Werte iterieren und die Werte auf den Vortag datieren
    for (let i = 0; i < data.length; i++) {
        let parsedValue = Number.parseFloat(data[i].value);

        // Falls der Wert vor dem repräsentiertbaren Start liegt, wird dieser nicht extrahiert

        if (!moment(data[i].date).startOf('day').add(interval, 'ms').isSameOrAfter(representalStart)) {
            lastValue = parsedValue;
            continue;
        }
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }

        // Wenn der gelesene Wert ungleich dem vorherigen ist, wird der aktuelle Wert extrahiert
        if (lastValue !== parsedValue) {
            ret.push(new ValueDto('' + lastValue, date.toDate().getTime()));
            date.add(interval,  'ms');
            lastValue = parsedValue;
        }
    }
    return ret;
}

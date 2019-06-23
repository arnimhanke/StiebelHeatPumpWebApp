declare module 'highstock-release/highstock' {
    import * as Highcharts from 'highcharts';
    export const StockChart: Highcharts.Chart;
    export const Chart: Highcharts.Chart;
    export function chart(options: Highcharts.Options, callback?: (chart: Highcharts.ChartObject) => void): Highcharts.ChartObject;
    export function chart(renderTo: string | HTMLElement, options: Highcharts.Options, callback?: (chart: Highcharts.ChartObject) => void): Highcharts.ChartObject;
    export function stockChart(options: Highcharts.Options, callback?: (chart: Highcharts.ChartObject) => void): Highcharts.ChartObject;
    export function stockChart(renderTo: string | HTMLElement, options: Highcharts.Options, callback?: (chart: Highcharts.ChartObject) => void): Highcharts.ChartObject;
    export function setOptions(options: Highcharts.GlobalOptions): Highcharts.Options;
}

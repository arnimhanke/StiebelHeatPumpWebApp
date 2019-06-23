
/**
 * Typ-Datei für recompose (genutzt von Griddle)
 * Dokumentation: https://github.com/acdlite/recompose/blob/master/docs/API.md
 */
declare module 'recompose/compose' {
    var compose: (a: any, b: any, c?: any) => any;
    export default compose;
}

declare module 'recompose/withHandlers' {
    var withHandlers: (handlers: any) => any;
    export default withHandlers;
}

declare module 'recompose/withState' {
    var withState: (stateName: any, stateUpdaterName: any, initialState: any) => any;
    export default withState;
}
declare module 'react-calendar-component' {
    import * as React from 'react';
    export interface CalendarProps extends React.HTMLProps<Calendar> {
        onChangeMonth: any,
        date: any,
        onPickDate: any,
        weekOffset: any,
        renderDay: any,
    }
    export class Calendar extends React.Component<CalendarProps, {}> { }
}

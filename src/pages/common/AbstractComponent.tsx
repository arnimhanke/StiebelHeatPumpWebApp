import * as React from 'react';

export abstract class AbstractView<T, S> extends React.Component<T, S> {
    constructor(props: T, state: S) {
        super(props, state);
    }
}

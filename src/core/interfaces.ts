export type Props = {
    [x: string]: any;
};

export type Handler = {
    id: string,
    store: Props,
    state: Props,
    updateState: CallableFunction,
    updateEvents: CallableFunction,
    componentState: Props
};
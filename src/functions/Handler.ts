export interface Handler<FN_TYPE extends (...args: any[]) => any> {
    handle: FN_TYPE;
}

import { Handler } from "../Handler";

import { HeartbeatFunction as Fn } from "./HeartbeatFunction";

export abstract class HeartbeatFunctionAbstractHandler implements Handler<Fn.Function> {
    public async handle(input: { uid: string }): Promise<Fn.Result> {
        Fn.Input.validate(input);
        return {
            timestampMs: Date.now(),
        };
    }
}

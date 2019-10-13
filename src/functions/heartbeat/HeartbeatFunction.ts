import ow from "ow--fork-by-jblew-with-catching";

export namespace HeartbeatFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "heartbeat";

    /**
     * Input
     */
    export interface Input {
        uid: string;
    }
    export namespace Input {
        export function validate(input: Input) {
            ow(input.uid, "HeartbeatFunction.Input.uid", ow.string.nonEmpty);
        }
    }

    /**
     * Result
     */
    export interface Result {
        timestampMs: number;
    }
    export namespace Result {
        export function validate(r: Result) {
            ow(r, "HeartbeatFunction.Result", ow.object);
            ow(r.timestampMs, "HeartbeatFunction.Result.log", ow.number.integer.finite.positive);
        }
    }
}

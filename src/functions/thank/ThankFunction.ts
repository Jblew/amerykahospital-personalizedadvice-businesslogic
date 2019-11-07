import ow from "ow--fork-by-jblew-with-catching";

export namespace ThankFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "thank";

    /**
     * Input
     */
    export interface Input {
        adviceId: string;
    }
    export namespace Input {
        export function validate(input: Input) {
            ow(input.adviceId, "ThankFunction.Input.adviceId", ow.string.nonEmpty);
        }
    }

    /**
     * Result
     */
    export interface Result {
        newThanksCount: number;
    }
    export namespace Result {
        export function validate(r: Result) {
            ow(r, "ThankFunction.Result", ow.object);
            ow(r.newThanksCount, "ThankFunction.Result.newThanksCount", ow.number.integer.finite.positive);
        }
    }
}

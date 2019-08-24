import ow from "ow--fork-by-jblew-with-catching";

import { PendingAdvice } from "../model/advice/PendingAdvice";

export namespace AddAdviceFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "add_advice";

    /**
     * Input
     */
    export type Input = PendingAdvice;
    export namespace Input {
        export function validate(input: Input) {
            PendingAdvice.validate(input, "AddAdviceFunction.Input");
        }
    }

    /**
     * Result
     */
    export interface Result {
        log: string;
        adviceId: string;
    }
    export namespace Result {
        export function validate(r: Result) {
            ow(r, "AddAdviceFunction.Result", ow.object);
            ow(r.log, "AddAdviceFunction.Result.log", ow.string);
            ow(r.adviceId, "AddAdviceFunction.Result.adviceId", ow.string.nonEmpty);
        }
    }
}

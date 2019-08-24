import ow from "ow--fork-by-jblew-with-catching";

import { Advice } from "../model/advice/Advice";

export namespace ImportAdviceToUserFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "import_advice_to_user";

    /**
     * Input
     */
    export interface AdviceId {
        adviceId: string;
    }
    export type Input = AdviceId;
    export namespace Input {
        export function validate(i: Input) {
            ow(i, "ImportAdviceToUserFunction.Result", ow.object);
            ow(i.adviceId, "ImportAdviceToUserFunction.Result.adviceId", ow.string.nonEmpty);
        }
    }

    /**
     * Result
     */
    export interface Result {
        advice: Advice;
        log: string;
    }
    export namespace Result {
        export function validate(r: Result) {
            ow(r, "ImportAdviceToUserFunction.Result", ow.object);
            ow(r.log, "ImportAdviceToUserFunction.Result.log", ow.string);
            ow(
                r.advice,
                "ImportAdviceToUserFunction.Result.advice",
                ow.object.catching(v => Advice.validate(v as Advice)),
            );
        }
    }
}

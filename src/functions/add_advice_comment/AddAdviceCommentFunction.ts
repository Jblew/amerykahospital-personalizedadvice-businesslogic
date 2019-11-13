import { AdviceComment } from "../../model/advice_comment/AdviceComment";
import { PendingAdviceComment } from "../../model/advice_comment/PendingAdviceComment";

export namespace AddAdviceCommentFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "add_advice_comment";

    /**
     * Input
     */
    export type Input = PendingAdviceComment;
    export const Input = {
        validate: (input: Input) => PendingAdviceComment.validate(input),
    };

    /**
     * Result
     */
    export type Result = AdviceComment;
    export const Result = {
        validate: (r: Result) => AdviceComment.validate(r),
    };
}

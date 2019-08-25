import ow from "ow--fork-by-jblew-with-catching";

export namespace SendSMSFunction {
    export type Function = (data: Input, ...args: any[]) => Promise<Result>;
    export const NAME = "send_sms";

    /**
     * Input
     */
    export interface AdviceId {
        adviceId: string;
    }
    export type Input = AdviceId;
    export namespace Input {
        export function validate(i: Input) {
            ow(i, "SendSMSFunction.Result", ow.object);
            ow(i.adviceId, "SendSMSFunction.Result.adviceId", ow.string.nonEmpty);
        }
    }

    /**
     * Result
     */
    export interface Result {
        message: string;
        sentSMSId: string;
    }
    export namespace Result {
        export function validate(r: Result) {
            ow(r, "SendSMSFunction.Result", ow.object);
            ow(r.message, "SendSMSFunction.Result.message", ow.string.nonEmpty);
            ow(r.sentSMSId, "SendSMSFunction.Result.sentSMSId", ow.string.nonEmpty);
        }
    }
}

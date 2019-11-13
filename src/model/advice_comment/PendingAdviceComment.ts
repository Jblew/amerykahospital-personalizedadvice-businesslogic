import ow from "ow--fork-by-jblew-with-catching";

export interface PendingAdviceComment {
    adviceId: string;
    text: string;
}

export namespace PendingAdviceComment {
    export function validate(o: PendingAdviceComment, prefix: string = "PendingAdviceComment") {
        ow(o, `${prefix}`, ow.object);
        ow(o.adviceId, `${prefix}.adviceId`, ow.string.nonEmpty);
        ow(o.text, `${prefix}.text`, ow.string.nonEmpty);
    }

    export type KeysType = { [x in keyof Required<PendingAdviceComment>]: string };
    export const keys: KeysType = {
        adviceId: "adviceId",
        text: "text",
    };
}

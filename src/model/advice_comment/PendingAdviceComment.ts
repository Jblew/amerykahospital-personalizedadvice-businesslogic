import ow from "ow--fork-by-jblew-with-catching";

export interface PendingAdviceComment {
    text: string;
}

export namespace PendingAdviceComment {
    export function validate(o: PendingAdviceComment, prefix: string = "PendingAdviceComment") {
        ow(o, `${prefix}`, ow.object);
        ow(o.text, `${prefix}.text`, ow.string.nonEmpty);
    }

    export type KeysType = { [x in keyof Required<PendingAdviceComment>]: string };
    export const keys: KeysType = {
        text: "text",
    };
}

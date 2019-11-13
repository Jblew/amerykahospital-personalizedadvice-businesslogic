import ow from "ow--fork-by-jblew-with-catching";

import { PendingAdviceComment } from "./PendingAdviceComment";

export interface AdviceComment extends PendingAdviceComment {
    id: string;
    authorUid: string;
    authorDisplayName: string;
    timestamp: number;
}

export namespace AdviceComment {
    export function validate(o: AdviceComment) {
        ow(
            o,
            "AdviceComment",
            ow.object.catching(v => PendingAdviceComment.validate(v as AdviceComment, "AdviceComment")),
        );

        ow(o.id, "AdviceComment.id", ow.string.nonEmpty);
        ow(o.authorUid, "AdviceComment.authorUid", ow.string.nonEmpty);
        ow(o.authorDisplayName, "AdviceComment.authorDisplayName", ow.string.nonEmpty);
        ow(o.timestamp, "AdviceComment.timestamp", ow.number.finite.integer.greaterThan(0));
    }

    export type KeysType = PendingAdviceComment.KeysType & { [x in keyof Required<AdviceComment>]: string };
    export const keys: KeysType = {
        ...PendingAdviceComment.keys,
        id: "id",
        authorUid: "authorUid",
        authorDisplayName: "authorDisplayName",
        timestamp: "timestamp",
    };
}

import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

export interface PendingChatMessage {
    fromName: string;
    fromUid: string;
    toChannel?: string;
    toUid?: string;
    message: string;
}

export namespace PendingChatMessage {
    export function validate(s: PendingChatMessage, namePrefix: string = "PendingChatMessage") {
        ow(s, "PendingChatMessage", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(s.fromName, `${namePrefix}.fromName`, ow.string.nonEmpty);
        ow(s.fromUid, `${namePrefix}.fromUid`, ow.string.nonEmpty);

        ow(s.toChannel, `${namePrefix}.toChannel`, ow.optional.string.nonEmpty);
        ow(s.toUid, `${namePrefix}.toUid`, ow.optional.string.nonEmpty);

        if (!s.toChannel && !s.toUid) {
            throw new TypeError("For PendingChatMessage you must specify either toChannel or toUid");
        }

        ow(s.message, `${namePrefix}.message`, ow.string.nonEmpty);
    }

    export type KeysType = { [x in keyof PendingChatMessage]: string };
    export const keys: KeysType = {
        fromName: "fromName",
        fromUid: "fromUid",
        toChannel: "toChannel",
        toUid: "toUid",
        message: "message",
    };
}

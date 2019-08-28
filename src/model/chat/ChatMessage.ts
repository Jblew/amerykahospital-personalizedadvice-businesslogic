import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

import { PendingChatMessage } from "./PendingChatMessage";

export interface ChatMessage extends PendingChatMessage {
    id: string;
    timestamp: number;
}

export namespace ChatMessage {
    export function validate(s: ChatMessage) {
        ow(s, "ChatMessage", ow.object.catching(v => forbidUndefinedKeys(v)));
        PendingChatMessage.validate(s, "ChatMessage");

        ow(s.id, "ChatMessage.id", ow.string.nonEmpty);
        ow(s.timestamp, "ChatMessage.timestamp", ow.number.finite.integer.positive);
    }

    export type KeysType = PendingChatMessage.KeysType & { [x in keyof ChatMessage]: string };
    export const keys: KeysType = {
        ...PendingChatMessage.keys,
        id: "id",
        timestamp: "timestamp",
    };
}

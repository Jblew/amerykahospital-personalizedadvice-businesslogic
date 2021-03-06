import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

import { PendingChatMessage } from "./PendingChatMessage";

export interface ChatMessage extends PendingChatMessage {
    id: string;
    timestampMs: number;
}

export namespace ChatMessage {
    export function validate(s: ChatMessage) {
        ow(s, "ChatMessage", ow.object.catching(v => forbidUndefinedKeys(v)));
        PendingChatMessage.validate(s, "ChatMessage");

        ow(s.id, "ChatMessage.id", ow.string.nonEmpty);
        ow(s.timestampMs, "ChatMessage.timestampMs", ow.number.finite.integer.positive);
    }

    export function isValid(s: any): s is ChatMessage {
        return ow.isValid(s, ow.object.catching(v => validate(v as ChatMessage)));
    }

    export type KeysType = PendingChatMessage.KeysType & { [x in keyof ChatMessage]: string };
    export const keys: KeysType = {
        ...PendingChatMessage.keys,
        id: "id",
        timestampMs: "timestampMs",
    };
}

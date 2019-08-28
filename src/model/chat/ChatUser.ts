import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

import { PendingChatUser } from "./PendingChatUser";

export interface ChatUser extends PendingChatUser {
    id: string;
}

export namespace ChatUser {
    export function validate(s: ChatUser) {
        ow(s, "ChatUser", ow.object.catching(v => forbidUndefinedKeys(v)));

        PendingChatUser.validate(s, "ChatUser");
        ow(s.id, "ChatUser.id", ow.string.nonEmpty);
    }

    export function isValid(s: ChatUser) {
        return ow.isValid(s, ow.object.catching(v => validate(v as ChatUser)));
    }

    export type KeysType = PendingChatUser.KeysType & { [x in keyof ChatUser]: string };
    export const keys: KeysType = {
        ...PendingChatUser.keys,
        id: "id",
    };
}

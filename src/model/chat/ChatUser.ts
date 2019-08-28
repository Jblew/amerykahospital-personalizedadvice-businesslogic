import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

import { PendingChatUser } from "./PendingChatUser";

export interface ChatUser extends PendingChatUser {
    id: string;
    timestamp: number;
}

export namespace ChatUser {
    export function validate(s: ChatUser) {
        ow(s, "ChatUser", ow.object.catching(v => forbidUndefinedKeys(v)));

        PendingChatUser.validate(s, "ChatUser");
        ow(s.id, "ChatUser.id", ow.string.nonEmpty);
    }
}

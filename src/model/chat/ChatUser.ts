import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

export interface ChatUser {
    id: string;
    uid: string;
    displayName: string;
    lastSeenTimestampS: number;
    role?: ChatUser.Role.Type | undefined;
}

export namespace ChatUser {
    export namespace Role {
        export const MEDICALPROFESSIONAL = "medicalprofessional";
        export const SERVICE = "service";
        export const UNKNOWN = "unknown";

        export type Type = typeof MEDICALPROFESSIONAL | typeof SERVICE | typeof UNKNOWN;
    }

    export function validate(s: ChatUser) {
        ow(s, "ChatUser", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(s.uid, `ChatUser.uid`, ow.string.nonEmpty);
        ow(s.displayName, `ChatUser.displayName`, ow.string.nonEmpty);
        ow(s.lastSeenTimestampS, `ChatUser.lastSeenTimestampS`, ow.number.integer.finite.positive);
        ow(
            s.role,
            `ChatUser.role`,
            ow.any(ow.undefined, ow.string.oneOf([Role.MEDICALPROFESSIONAL, Role.SERVICE, Role.UNKNOWN])),
        );
        ow(s.id, "ChatUser.id", ow.string.nonEmpty.equals(s.uid));
    }

    export function isValid(s: any): s is ChatUser {
        return ow.isValid(s, ow.object.catching(v => validate(v as ChatUser)));
    }

    export type KeysType = { [x in keyof ChatUser]: string };
    export const keys: KeysType = {
        uid: "uid",
        displayName: "displayName",
        lastSeenTimestampS: "lastSeenTimestampS",
        role: "role",
        id: "id",
    };
}

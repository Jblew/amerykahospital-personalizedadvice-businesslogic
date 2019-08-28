import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

export interface PendingChatUser {
    uid: string;
    displayName: string;
    lastSeenTimestampS: number;
    role?: PendingChatUser.Role.Type | undefined;
}

export namespace PendingChatUser {
    export namespace Role {
        export const MEDICALPROFESSIONAL = "medicalprofessional";
        export const SERVICE = "service";
        export const UNKNOWN = "unknown";

        export type Type = typeof MEDICALPROFESSIONAL | typeof SERVICE | typeof UNKNOWN;
    }

    export function validate(s: PendingChatUser, namePrefix: string = "PendingChatUser") {
        ow(s, "PendingChatUser", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(s.uid, `${namePrefix}.uid`, ow.string.nonEmpty);
        ow(s.displayName, `${namePrefix}.displayName`, ow.string.nonEmpty);
        ow(s.lastSeenTimestampS, `${namePrefix}.lastSeenTimestampS`, ow.number.integer.finite.positive);
        ow(
            s.role,
            `${namePrefix}.role`,
            ow.any(ow.undefined, ow.string.oneOf([Role.MEDICALPROFESSIONAL, Role.SERVICE, Role.UNKNOWN])),
        );
    }

    export type KeysType = { [x in keyof PendingChatUser]: string };
    export const keys: KeysType = {
        uid: "uid",
        displayName: "displayName",
        lastSeenTimestampS: "lastSeenTimestampS",
        role: "role",
    };
}

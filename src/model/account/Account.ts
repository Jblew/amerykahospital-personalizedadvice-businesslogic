import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

export interface Account {
    displayName: string | null;
    uid: string;
}

export namespace Account {
    export function validate(a: Account) {
        ow(a, "Account", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(a.uid, "Account.uid", ow.string.nonEmpty);
        ow(a.displayName, "Account.displayName", ow.any(ow.null, ow.string.nonEmpty));
    }
}

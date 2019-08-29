import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

export interface PendingMedicalProfessional {
    displayName: string;
    test?: boolean;
}

export namespace PendingMedicalProfessional {
    export function validate(o: PendingMedicalProfessional, prefix: string = "PendingMedicalProfessional") {
        ow(o, "PendingMedicalProfessional", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(o, `${prefix}`, ow.object);
        ow(o.displayName, `${prefix}.displayName`, ow.string.nonEmpty);
        ow(o.test, `${prefix}.test`, ow.optional.boolean);
    }

    export function isValid(s: any): s is PendingMedicalProfessional {
        return ow.isValid(s, ow.object.catching(v => validate(v as PendingMedicalProfessional)));
    }

    export type KeysType = { [x in keyof PendingMedicalProfessional]: string };
    export const keys: KeysType = {
        displayName: "displayName",
        test: "test",
    };
}

import ow from "ow--fork-by-jblew-with-catching";

export interface PendingMedicalProfessional {
    displayName: string;
    test?: boolean;
}

export namespace PendingMedicalProfessional {
    export function validate(o: PendingMedicalProfessional, prefix: string = "PendingMedicalProfessional") {
        ow(o, `${prefix}`, ow.object);
        ow(o.displayName, `${prefix}.displayName`, ow.string.nonEmpty);
        ow(o.test, `${prefix}.test`, ow.optional.boolean);
    }

    export type KeysType = { [x in keyof PendingMedicalProfessional]: string };
    export const keys: KeysType = {
        displayName: "displayName",
        test: "test",
    };
}

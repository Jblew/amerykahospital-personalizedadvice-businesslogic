import ow from "ow--fork-by-jblew-with-catching";

import { forbidUndefinedKeys } from "../../util/forbid-undefined-keys";

import { PendingMedicalProfessional } from "./PendingMedicalProfessional";

//
export interface MedicalProfessional extends PendingMedicalProfessional {
    id: string;
}

export namespace MedicalProfessional {
    export function validate(o: MedicalProfessional) {
        ow(o, "MedicalProfessional", ow.object.catching(v => forbidUndefinedKeys(v)));
        ow(
            o,
            "MedicalProfessional",
            ow.object.catching(v =>
                PendingMedicalProfessional.validate(v as MedicalProfessional, "MedicalProfessional"),
            ),
        );

        ow(o.id, "MedicalProfessional.id", ow.string.nonEmpty);
    }

    export function isValid(s: any): s is MedicalProfessional {
        return ow.isValid(s, ow.object.catching(v => validate(v as MedicalProfessional)));
    }

    export type KeysType = PendingMedicalProfessional.KeysType & { [x in keyof MedicalProfessional]: string };
    export const keys: KeysType = {
        ...PendingMedicalProfessional.keys,
        id: "id",
    };
}

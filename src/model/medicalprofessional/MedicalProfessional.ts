import ow from "ow--fork-by-jblew-with-catching";

import { PendingMedicalProfessional } from "./PendingMedicalProfessional";

//
export interface MedicalProfessional extends PendingMedicalProfessional {
    id: string;
    timestamp: number;
}

export namespace MedicalProfessional {
    export function validate(o: MedicalProfessional) {
        ow(
            o,
            "MedicalProfessional",
            ow.object.catching(v =>
                PendingMedicalProfessional.validate(v as MedicalProfessional, "MedicalProfessional"),
            ),
        );

        ow(o.id, "MedicalProfessional.id", ow.string.nonEmpty);
    }

    export type KeysType = PendingMedicalProfessional.KeysType & { [x in keyof MedicalProfessional]: string };
    export const keys: KeysType = {
        ...PendingMedicalProfessional.keys,
        id: "id",
        timestamp: "timestamp",
    };
}
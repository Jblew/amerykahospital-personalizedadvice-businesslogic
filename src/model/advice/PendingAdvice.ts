import ow from "ow--fork-by-jblew-with-catching";

export interface PendingAdvice {
    patientName: string;
    medicalprofessionalName: string;
    parentPhoneNumber: string;
    advice: string;
}

export namespace PendingAdvice {
    export function validate(o: PendingAdvice, prefix: string = "PendingAdvice") {
        ow(o, `${prefix}`, ow.object);
        ow(o.medicalprofessionalName, `${prefix}.medicalprofessionalName`, ow.string.nonEmpty);
        ow(o.patientName, `${prefix}.patientName`, ow.string.nonEmpty);
        ow(o.parentPhoneNumber, `${prefix}.parentPhoneNumber`, ow.string.numeric.length(9));
        ow(o.advice, `${prefix}.advice`, ow.string.nonEmpty);
    }

    export type KeysType = { [x in keyof PendingAdvice]: string };
    export const keys: KeysType = {
        patientName: "patientName",
        medicalprofessionalName: "medicalprofessionalName",
        parentPhoneNumber: "parentPhoneNumber",
        advice: "advice",
    };
}

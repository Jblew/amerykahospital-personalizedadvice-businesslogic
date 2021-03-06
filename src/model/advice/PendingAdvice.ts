import ow from "ow--fork-by-jblew-with-catching";

export interface PendingAdvice {
    patientName: string;
    medicalprofessionalName: string;
    authorUid?: string;
    evidenceHash?: string;
    parentPhoneNumber: string;
    advice: string;
    test?: boolean;
}

export namespace PendingAdvice {
    export function validate(o: PendingAdvice, prefix: string = "PendingAdvice") {
        ow(o, `${prefix}`, ow.object);
        ow(o.medicalprofessionalName, `${prefix}.medicalprofessionalName`, ow.string.nonEmpty);
        ow(o.authorUid, `${prefix}.authorUid`, ow.optional.string.nonEmpty);
        ow(o.evidenceHash, `${prefix}.evidenceHash`, ow.optional.string.nonEmpty);
        ow(o.patientName, `${prefix}.patientName`, ow.string.nonEmpty);
        ow(o.parentPhoneNumber, `${prefix}.parentPhoneNumber`, ow.string.numeric.length(9));
        ow(o.advice, `${prefix}.advice`, ow.string.nonEmpty);
        ow(o.test, `${prefix}.test`, ow.optional.boolean);
    }

    export type KeysType = { [x in keyof Required<PendingAdvice>]: string };
    export const keys: KeysType = {
        patientName: "patientName",
        medicalprofessionalName: "medicalprofessionalName",
        authorUid: "authorUid",
        evidenceHash: "evidenceHash",
        parentPhoneNumber: "parentPhoneNumber",
        advice: "advice",
        test: "test",
    };
}
